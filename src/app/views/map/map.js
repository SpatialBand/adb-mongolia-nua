import {ADBMapViewController} from './adb-map-view.controller';

class ADBMapPageController extends ADBMapViewController {
  /** @ngInject */
  constructor($filter, $log, AimagData, Config, ZoomToDropdown, NationalConfig) {
    super($filter, $log, AimagData, Config, ZoomToDropdown);
    this.pageConfig = NationalConfig;
  }
}

export const adbMapView = {
  templateUrl: 'app/views/map/map.html',
  controller: ADBMapPageController
};
