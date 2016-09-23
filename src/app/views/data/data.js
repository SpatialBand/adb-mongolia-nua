import {ADBMapController} from '../../adb-map.controller';
import angular from 'angular';

const L = require('leaflet');

class DataViewController extends ADBMapController {

  /** @ngInject */
  constructor($window, $filter, $log, $scope, $stateParams, $timeout, $q, Config, SoumData) {
    super($filter, Config, 'dataMap');
    this.$log = $log;
    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.soumData = SoumData;
    this.$timeout = $timeout;
    this.$window = $window;
    this.$q = $q;
  }

  $onInit() {
    super.$onInit();

    // Initialize the histogram charts configuration
    this.charts = this.config.charts;
    this.charts.calloutList = [];
    this.charts.data = [];

    angular.element(this.$window).bind('resize', this._onResize.bind(this));

    this.soumCode = Number.parseInt(this.$stateParams.soumCode, 10);
    this.$log.debug('soum code:', this.soumCode);

    this.soumData.geojson(this.soumCode).then(geojson => this._addGeoJSONLayer(geojson));
    const soumPromise = this.soumData.load(this.soumCode).then(soum => this.soum = soum); // eslint-disable-line no-return-assign

    const compareColumns = [];
    for (const type of Object.keys(this.charts.histograms)) {
      const field = this.charts.histograms[type].field;
      compareColumns.push(field);
    }

    const comparePromise = this.soumData.compare(this.soumCode, compareColumns);

    this.$q.all([soumPromise, comparePromise]).then(results => this._setChartData(results));

    // Simulate a resize to get initial widths for the histograms
    this._onResize();
  }

  _setupMap(options) {
    options.options.scrollWheelZoom = false;
    super._setupMap(options);
  }

  _addGeoJSONLayer(geojson) {
    L.geoJson(geojson).addTo(this.map);
  }

  _onResize() {
    this.charts.width = document.querySelectorAll(".histogram .panel-content p")[0].clientWidth;
    this.$timeout(() => this.$scope.$apply());
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
