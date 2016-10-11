
import angular from 'angular';

import {ZoomToDropdownFactory} from './zoomtodropdown.factory';
import {UtilsFactory} from './utils.factory';

export const adbFactoriesModule = 'adb.factories';

angular
  .module(adbFactoriesModule, [])
  .factory('Utils', UtilsFactory)
  .factory('ZoomToDropdown', ZoomToDropdownFactory);
