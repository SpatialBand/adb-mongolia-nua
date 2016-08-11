const cartodb = require('cartodb');

/* ngInject */
export function SoumData($log, $http, $q, Config) {
  return {
    geojson,
    load
  };

  function geojson(soumId) {
    // Given a soumId return the geojson boundary for it
    // Wrap in angular promise so we're consistent with the types of promises we're
    //  using in public APIs
    const dfd = $q.defer();
    const sql = new cartodb.SQL({user: Config.carto.accountName});
    sql.execute("SELECT the_geom FROM soums WHERE soumcode = {{soumcode}}", {
      soumcode: soumId
    }, {
      format: 'geojson'
    }).done(data => dfd.resolve(data)).error(error => dfd.reject(error));
    return dfd.promise;
  }

  function load(soumId) {
    // Return a promise that resolves with the constructed soum
    return loadSoumData(soumId).then(responses => {
      // Pass all response objects to merge them together as one row
      const combinedRow = mergeResponses(responses);
      // Format the combined result with the same structure as Config
      const soum = formatSoumData(combinedRow);
      // Done!
      return soum;
    });
  }

  function mergeResponses(responses) {
    // Take several CartoSQL responses (Assuming a single row each) and return
    //  an object with the combined columns from each. Repeated column names
    //  are overwritten.
    const result = {};
    for (const response of responses) {
      const row = response.data.rows[0];
      for (const key of Object.keys(row)) {
        result[key] = row[key];
      }
    }
    $log.log(result);
    return result;
  }

  function formatSoumData(soumRow) {
    // Take a key->value row from CartoSQL and format it the same way as Config
    const soum = {};
    for (const label of Object.keys(Config.mapSections)) {
      const section = Config.mapSections[label];
      soum[label] = processSection(soumRow, section);
    }

    return soum;
  }

  function processSection(soumRow, section) {
    // Process through a section of the Config definitions and add values from
    //  CartoSQL to each field.
    const results = {};
    for (const variable of section.visualizations) {
      // Attach this Soum's value to the column object
      variable.value = soumRow[variable.field];
      results[variable.field] = variable;
    }
    return results;
  }

  function getAllFields() {
    // Parse through the config to build a mapping of {table: [field...]} for all
    //  columns referenced.
    const fields = {};
    for (const label of Object.keys(Config.mapSections)) {
      const section = Config.mapSections[label];
      for (const variable of section.visualizations) {
        const table = variable.table || 'soums';
        if (!fields[table]) {
          fields[table] = [];
        }
        fields[table].push(variable.field);
      }
    }
    return fields;
  }

  function loadSoumData(soumId) {
    // Given a Soum ID, use CartoSQL to load all data referenced in the Config
    //  for that Soum.
    const fieldList = getAllFields();
    const promises = [];

    for (const table of Object.keys(fieldList)) {
      const fields = fieldList[table];
      const query = `SELECT ${fields} FROM ${table} WHERE soumcode = ${soumId}`;

      const request = {
        method: 'GET',
        url: `https://${Config.carto.accountName}.carto.com/api/v2/sql?q=${query}`
      };

      promises.push($http(request));
    }

    return $q.all(promises);
  }
}
