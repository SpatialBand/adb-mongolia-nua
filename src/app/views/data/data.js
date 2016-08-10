import {ADBMapController} from '../../adb-map.controller';

const L = require('leaflet');
const cartodb = require('cartodb');

class DataViewController extends ADBMapController {

  /** @ngInject */
  constructor($log, $stateParams, Config) {
    super(Config, 'dataMap');
    this.$log = $log;
    this.$stateParams = $stateParams;
  }

  $onInit() {
    super.$onInit();

    this.soumCode = this.$stateParams.soumCode;
    this.$log.debug('soum code:', this.soumCode);

    this._getSoumForMap();
  }

  _setupMap(options) {
    options.options.scrollWheelZoom = false;
    super._setupMap(options);
  }

  // TODO: Use whatever sql service @rmartz creates for that task
  _getSoumForMap() {
    const sql = new cartodb.SQL({user: this.config.carto.accountName});
    sql.execute("SELECT the_geom FROM soums WHERE soumcode = {{soumcode}}", {
      soumcode: this.soumCode
    }, {
      format: 'geojson'
    }).done(data => this._addGeoJSONLayer(data));
  }

  _addGeoJSONLayer(geojson) {
    L.geoJson(geojson).addTo(this.map);
  }
}

export const adbDataView = {
  templateUrl: 'app/views/data/data.html',
  controller: DataViewController
};
