
import angular from 'angular';

import {ZoomToDropdownFactory} from './zoomtodropdown.factory';

export const adbFactoriesModule = 'adb.factories';

angular
  .module(adbFactoriesModule, [])
  .factory('ZoomToDropdown', ZoomToDropdownFactory);
