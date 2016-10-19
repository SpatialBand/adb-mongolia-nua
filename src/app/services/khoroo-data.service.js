const cartodb = require('cartodb');

/** @ngInject */
export function KhorooData($q, Config) {
  return {
    geojson
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
}
