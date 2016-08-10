/* ngInject */
export function SoumData($log, $http, $q, Config) {
  const username = 'adbmongolia';

  return {
    load: soumId => {
      // Return a promise that resolves with the constructed soum
      return $q((resolve, reject) => {
        // Send a HTTP request to load the soum's raw data
        loadSoumData(soumId).then(response => {
          const row = response.data.rows[0];
          const soum = formatSoumData(row);
          resolve(soum);
        }, () => {
          reject();
        });
      });
    }
  };

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
      const variable = Object.assign({}, section.visualizations[i]);
      variable.value = soumRow[variable.field];
      results[variable.field] = variable;
    }
    return results;
  }

  function getAllFields() {
    const fields = [];
    for (const label in Config.mapSections) {
      if (Config.mapSections.hasOwnProperty(label)) {
        const section = Config.mapSections[label];
        for (let i = 0; i < section.visualizations.length; i++) {
          fields.push(section.visualizations[i].field);
        }
      }
    }
    return fields;
  }

  function loadSoumData(soumId) {
    const fields = getAllFields().join(',');
    const query = `SELECT ${fields} FROM soums WHERE soumcode = ${soumId}`;

    const request = {
      method: 'GET',
      url: `https://${username}.carto.com/api/v2/sql?q=${query}`
    };

    return $http(request);
  }
}
