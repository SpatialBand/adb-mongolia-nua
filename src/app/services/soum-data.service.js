/* ngInject */
export function SoumData($log, $http, $q, Config) {
  const username = 'adbmongolia';

  return {
    load: soumId => {
      // Return a promise that resolves with the constructed soum
      return $q((resolve, reject) => {
        // Send a HTTP request to load the soum's raw data
        loadSoumData(soumId).then(responses => {
          // Pass all response objects to merge them together as one row
          const combinedRow = mergeResponses(responses);
          const soum = formatSoumData(combinedRow);
          resolve(soum);
        }, () => {
          reject();
        });
      });
    }
  };

  function mergeResponses(responses) {
    const result = {};
    for (let i = 0; i < responses.length; i++) {
      const row = responses[i].data.rows[0];
      for (const key in row) {
        if (row.hasOwnProperty(key)) {
          result[key] = row[key];
        }
      }
    }
    $log.debug(result);
    return result;
  }

  function formatSoumData(soumRow) {
    const soum = {};
    for (const label in Config.mapSections) {
      if (Config.mapSections.hasOwnProperty(label)) {
        const section = Config.mapSections[label];
        soum[label] = processSection(soumRow, section);
      }
    }

    return soum;
  }

  function processSection(soumRow, section) {
    const results = {};
    for (let i = 0; i < section.visualizations.length; i++) {
      // Create a copy of this column so we don't change the actual config
      const variable = Object.assign({}, section.visualizations[i]);
      // Attach this Soum's value to the column object
      variable.value = soumRow[variable.field];
      results[variable.field] = variable;
    }
    return results;
  }

  function getAllFields() {
    const fields = {};
    for (const label in Config.mapSections) {
      if (Config.mapSections.hasOwnProperty(label)) {
        const section = Config.mapSections[label].visualizations;
        for (let i = 0; i < section.length; i++) {
          const table = section[i].table || 'soums';
          if (!fields[table]) {
            fields[table] = [];
          }
          fields[table].push(section[i].field);
        }
      }
    }
    return fields;
  }

  function loadSoumData(soumId) {
    const fieldList = getAllFields();
    const promises = [];

    for (const table in fieldList) {
      if (fieldList.hasOwnProperty(table)) {
        const fields = fieldList[table].join(',');
        const query = `SELECT ${fields} FROM ${table} WHERE soumcode = ${soumId}`;

        const request = {
          method: 'GET',
          url: `https://${username}.carto.com/api/v2/sql?q=${query}`
        };

        promises.push($http(request));
      }
    }

    return $q.all(promises);
  }
}
