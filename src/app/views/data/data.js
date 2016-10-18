import {ADBMapController} from '../../adb-map.controller';

const L = require('leaflet');

class DataViewController extends ADBMapController {

  /** @ngInject */
  constructor($window, $filter, $log, $scope, $stateParams, $timeout, $q, Config, DataConfig, SoumData) {
    super($filter, Config, 'dataMap');
    this.$log = $log;
    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.soumData = SoumData;
    this.$timeout = $timeout;
    this.$window = $window;
    this.$q = $q;
    this.dataConfig = DataConfig[$stateParams.dataConfigKey];
  }

  $onInit() {
    super.$onInit();

    // Initialize the histogram charts configuration
    this.charts = this.dataConfig.charts;
    this.charts.calloutList = [];
    this.charts.data = undefined;

    this.soumCode = Number.parseInt(this.$stateParams.soumCode, 10);
    this.$log.debug('soum code:', this.soumCode);

    this.soumData.geojson(this.soumCode).then(geojson => this._addGeoJSONLayer(geojson));
    const soumPromise = this.soumData.load(this.soumCode, this.dataConfig.mapSections)
      .then(soum => this.soum = soum); // eslint-disable-line no-return-assign

    const compareColumns = [];
    for (const type of Object.keys(this.charts.histograms)) {
      const field = this.charts.histograms[type].field;
      compareColumns.push(field);
    }

    const comparePromise = this.soumData.compare(this.soumCode, compareColumns);

    this.$q.all([soumPromise, comparePromise]).then(results => this._setChartData(results));
  }

  _setupMap(options) {
    options.options.scrollWheelZoom = false;
    super._setupMap(options);
  }

  _addGeoJSONLayer(geojson) {
    L.geoJson(geojson).addTo(this.map);
  }

  _setChartData(results) {
    const soum = results[0];
    const data = results[1];
    this.charts.data = data.rows;
    this.charts.callouts.soum.label = soum.metadata.soum_name.value;

    this.charts.calloutList = [];
    for (const type of Object.keys(this.charts.callouts)) {
      const callout = this.charts.callouts[type];
      callout.value = data.comparison[type];

      this.charts.calloutList.push(callout);
    }
  }
}

export const adbDataView = {
  templateUrl: 'app/views/data/data.html',
  controller: DataViewController
};
