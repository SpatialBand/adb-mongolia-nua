import {ADBMapController} from '../../adb-map.controller';

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
  }

  $onInit() {
    super.$onInit();

    this.charts = {
      fields: {
        people: 'den14',
        households: 'hh14',
        economy: 'ent14',
        infrastructure: 'pcwat10'
      },
      height: 300,
      width: undefined,
      data: undefined,
      calloutColors: ['#8FBD84']
    };

    angular.element(this.$window).bind('resize', this._onResize.bind(this));

    this.soumCode = this.$stateParams.soumCode;
    this.$log.debug('soum code:', this.soumCode);

    this.soumData.geojson(this.soumCode).then(geojson => this._addGeoJSONLayer(geojson));
    this.soumData.load(this.soumCode).then(soum => this.soum = soum); // eslint-disable-line no-return-assign

    const compareColumns = [];
    for (const type of Object.keys(this.charts.fields)) {
      const field = this.charts.fields[type];
      compareColumns.push(field);
    }

    this.soumData.compare(compareColumns).then(data => this.charts.data = data.rows); // eslint-disable-line no-return-assign

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
}

export const adbDataView = {
  templateUrl: 'app/views/data/data.html',
  controller: DataViewController
};
