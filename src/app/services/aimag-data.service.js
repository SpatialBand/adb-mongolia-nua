const cartodb = require('cartodb');

/** @ngInject */
export function AimagData($log, $q, Config) {
  return {
    list
  };

  function list() {
    // Returns a list of Aimags with name and the GeoJSON boundary for each
    const dfd = $q.defer();
    const sql = new cartodb.SQL({user: Config.carto.accountName});
    sql.execute("SELECT aimag AS label, ST_AsGeoJSON(the_geom) AS the_geom FROM aimags")
      .done(data => dfd.resolve(data)).error(error => dfd.reject(error));
    return dfd.promise;
  }
}
