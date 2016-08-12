import {ADBMapController} from '../../adb-map.controller';

const L = require('leaflet');

class DataViewController extends ADBMapController {

  /** @ngInject */
  constructor($filter, $log, $stateParams, Config, SoumData) {
    super($filter, Config, 'dataMap');
    this.$log = $log;
    this.$stateParams = $stateParams;
    this.soumData = SoumData;
  }

  $onInit() {
    super.$onInit();

    this.soumCode = this.$stateParams.soumCode;
    this.$log.debug('soum code:', this.soumCode);

    this.soumData.geojson(this.soumCode).then(geojson => this._addGeoJSONLayer(geojson));
    this.soumData.load(this.soumCode).then(soum => this.soum = soum); // eslint-disable-line no-return-assign
  }

  _setupMap(options) {
    options.options.scrollWheelZoom = false;
    super._setupMap(options);
  }

  _addGeoJSONLayer(geojson) {
    L.geoJson(geojson).addTo(this.map);
  }
}

export const adbDataView = {
  templateUrl: 'app/views/data/data.html',
  controller: DataViewController
};
