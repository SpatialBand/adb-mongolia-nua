
import angular from 'angular';

import {Comparatize} from './comparatize.filter';

export const adbFiltersModule = 'adb.filters';

angular
  .module(adbFiltersModule, [])
  .filter('comparatize', Comparatize);
