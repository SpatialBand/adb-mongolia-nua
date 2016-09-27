
import angular from 'angular';

import {ChartingController} from './charting.controller';

export const adbControllersModule = 'adb.controllers';

angular
  .module(adbControllersModule, [])
  .controller('ChartingController', ChartingController);
