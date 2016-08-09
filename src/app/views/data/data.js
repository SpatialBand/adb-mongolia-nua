import {ADBMapController} from '../../adb-map.controller';

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
  }

  _setupMap(options) {
    options.options.scrollWheelZoom = false;
    super._setupMap(options);
  }
}

export const adbDataView = {
  templateUrl: 'app/views/data/data.html',
  controller: DataViewController
};
