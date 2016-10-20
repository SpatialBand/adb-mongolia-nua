import {ADBMapController} from '../../adb-map.controller';

const L = require('leaflet');

class UbDataViewController extends ADBMapController {

  /** @ngInject */
  constructor($window, $filter, $log, $scope, $stateParams, $timeout, $q, Config, UlaanbaatarConfig, KhorooData) {
    super($filter, Config, 'dataMap');
    this.$log = $log;
    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.khorooData = KhorooData;
    this.$timeout = $timeout;
    this.$window = $window;
    this.$q = $q;
    this.pageConfig = UlaanbaatarConfig;
  }

  $onInit() {
    super.$onInit();

    // Initialize the histogram charts configuration
    this.charts = this.pageConfig.charts;
    this.charts.calloutList = [];
    this.charts.data = undefined;

    this.khorooId = this.$stateParams.khorooId;
    this.$log.debug('khoroo:', this.khorooId);

    this.khorooData.geojson(this.khorooId).then(geojson => this._addGeoJSONLayer(geojson));
    const khorooPromise = this.khorooData.load(this.khorooId, this.pageConfig.mapSections)
      .then(khoroo => this.khoroo = khoroo); // eslint-disable-line no-return-assign

    const compareColumns = [];
    for (const type of Object.keys(this.charts.histograms)) {
      const field = this.charts.histograms[type].field;
      compareColumns.push(field);
    }

    const comparePromise = this.khorooData.compare(this.khorooId, compareColumns);

    this.$q.all([khorooPromise, comparePromise]).then(results => this._setChartData(results));
  }

  _setupMap(options) {
    options.options.scrollWheelZoom = false;
    super._setupMap(options);
  }

  _addGeoJSONLayer(geojson) {
    const layer = L.geoJson(geojson);
    layer.addTo(this.map);
    this.map.fitBounds(layer.getBounds(), {maxZoom: 13});
  }

  _setChartData(results) {
    const khoroo = results[0];
    const data = results[1];
    this.charts.data = data.rows;
    this.charts.callouts.khoroo.label = khoroo.metadata.khoroo_name.value;

    this.charts.calloutList = [];
    for (const type of Object.keys(this.charts.callouts)) {
      const callout = this.charts.callouts[type];
      callout.value = data.comparison[type];

      this.charts.calloutList.push(callout);
    }
  }
}

export const adbUbDataView = {
  templateUrl: 'app/views/data/ub-data.html',
  controller: UbDataViewController
};
