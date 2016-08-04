import angular from 'angular';

import {adbNavbarView} from './navbar/navbar';
import {adbHomeView} from './home/home';
import {adbMapView} from './map/map';
import {adbDataView} from './data/data';
import {appConfig} from '../../config';

export const adbViewModule = 'adb.views';

angular
  .module(adbViewModule, [appConfig])
  .component('adbNavbarView', adbNavbarView)
  .component('adbHomeView', adbHomeView)
  .component('adbMapView', adbMapView)
  .component('adbDataView', adbDataView);
