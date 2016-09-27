
import angular from 'angular';

import {adbControllersModule} from '../controllers/index';
import {HistogramDirective, HistogramDefaults} from './histogram.directive';

export const adbDirectivesModule = 'adb.directives';

angular
  .module(adbDirectivesModule, [adbControllersModule])
  .constant('HistogramDefaults', HistogramDefaults)
  .directive('adbHistogram', HistogramDirective);
