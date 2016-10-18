import {ADBMapViewController} from './adb-map-view.controller';

class ADBUbMapPageController extends ADBMapViewController {
  /** @ngInject */
  constructor($filter, $log, AimagData, Config, ZoomToDropdown, UlaanbaatarConfig) {
    super($filter, $log, AimagData, Config, ZoomToDropdown);
    this.pageConfig = UlaanbaatarConfig;
  }

  _setupZoomDropdown() { /* Override as NOOP */ }
}

export const adbUbMapView = {
  templateUrl: 'app/views/map/map.html',
  controller: ADBUbMapPageController
};
