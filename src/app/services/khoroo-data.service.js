const cartodb = require('cartodb');

/** @ngInject */
export function KhorooData($log, $http, $q, Config, UlaanbaatarConfig, _) {
  return {
    geojson,
    load,
    compare
  };

  function geojson(khorooId) {
    // Given a khorooId return the geojson boundary for it
    // Wrap in angular promise so we're consistent with the types of promises we're
    //  using in public APIs
    const dfd = $q.defer();
    const sql = new cartodb.SQL({user: Config.carto.accountName});
    sql.execute("SELECT the_geom FROM khoroos WHERE kh_eng = '{{khorooId}}'", {
      khorooId
    }, {
      format: 'geojson'
    }).done(data => dfd.resolve(data)).error(error => dfd.reject(error));
    return dfd.promise;
  }

  function load(khorooId, mapSections) {
    // mapSections is the relevant mapSections key of a PageConfig object to load data for
    // Return a promise that resolves with the constructed khoroo
    return loadKhorooData(khorooId, mapSections).then(responses => {
      // Pass all response objects to merge them together as one row
      const combinedRow = mergeResponses(responses);
      // Format the combined result with the same structure as Config
      const khoroo = formatKhorooData(combinedRow, mapSections);
      // Done!
      return khoroo;
    });
  }

  function compare(khorooId, columns) {
    const dfd = $q.defer();
    const sql = new cartodb.SQL({user: Config.carto.accountName});
    const query = "SELECT khoroos.kh_eng, {{columns}} FROM khoroos";
    sql.execute(query, {columns})
      .done(data => dfd.resolve(data))
      .error(error => dfd.reject(error));
    return dfd.promise.then(data => _parseCompare(data, khorooId, columns));
  }

  function _parseCompare(data, khorooId, columns) {
    const rows = data.rows;
    const khorooRow = _.find(rows, {kh_eng: khorooId});

    const comparison = {
      ulaanbaatar: {},
      khoroo: khorooRow
    };

    for (const column of columns) {
      const colData = _.map(rows, column);
      comparison.ulaanbaatar[column] = colData.reduce((sum, val) => sum + val, 0) / colData.length;
    }
    return {rows, comparison};
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

  function formatKhorooData(row, mapSections) {
    // Take a key->value row from CartoSQL and format it the same way as Config
    const khoroo = {};
    for (const label of Object.keys(mapSections)) {
      const section = mapSections[label];
      khoroo[label] = processSection(row, section, 'visualizations');
    }
    khoroo.metadata = processSection(row, UlaanbaatarConfig.metadata, 'fields');

    return khoroo;
  }

  function processSection(row, section, container) {
    // Process through a section of the Config definitions and add values from
    //  CartoSQL to each field.
    const results = {};
    for (const variable of section[container]) {
      // Attach this Khoroo's value to the column object
      variable.value = row[variable.field];
      const id = variable.key || variable.field;
      results[id] = variable;
    }
    return results;
  }

  function getAllFields(mapSections) {
    // Parse through the config to build a mapping of {table: [field...]} for all
    //  columns referenced.
    const fields = {};
    for (const label of Object.keys(mapSections)) {
      loadSectionFields(fields, mapSections[label], 'visualizations');
    }
    loadSectionFields(fields, UlaanbaatarConfig.metadata, 'fields');
    return fields;
  }

  function loadSectionFields(fields, section, container) {
    for (const variable of section[container]) {
      const table = variable.table || section.table;
      if (!fields[table]) {
        fields[table] = [];
      }
      fields[table].push(variable.field);
    }
  }

  function loadKhorooData(khorooId, mapSections) {
    // Given a Khoroo ID, use CartoSQL to load all data referenced in the Config
    //  for that Khoroo.
    const fieldList = getAllFields(mapSections);
    const promises = [];

    for (const table of Object.keys(fieldList)) {
      const fields = fieldList[table];
      const query = `SELECT ${fields} FROM ${table} WHERE kh_eng = '${khorooId}'`;

      const request = {
        method: 'GET',
        url: `https://${Config.carto.accountName}.carto.com/api/v2/sql?q=${query}`
      };

      promises.push($http(request));
    }

    return $q.all(promises);
  }
}
