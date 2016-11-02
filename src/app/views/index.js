import 'babel-polyfill';
import angular from 'angular';

import {adbNavbarView} from './navbar/navbar';
import {adbHomeView} from './home/home';
import {adbMapView} from './map/map';
import {adbUbMapView} from './map/ub-map';
import {adbDataView} from './data/data';
import {adbUbDataView} from './data/ub-data';
import {adbInfoblockView} from './infoblock/infoblock';
import {appConfig} from '../../config';
import {adbLangModule} from '../i18n/index';
import {adbControllersModule} from '../controllers/index';
import {adbDirectivesModule} from '../directives/index';
import {adbServicesModule} from '../services/index';
import {adbFactoriesModule} from '../factories/index';
import {adbFiltersModule} from '../filters/index';

export const adbViewModule = 'adb.views';

angular
  .module(adbViewModule, [appConfig, adbLangModule, adbControllersModule, adbDirectivesModule,
                          adbServicesModule, adbFiltersModule, adbFactoriesModule])
  .component('adbNavbarView', adbNavbarView)
  .component('adbHomeView', adbHomeView)
  .component('adbMapView', adbMapView)
  .component('adbUbMapView', adbUbMapView)
  .component('adbDataView', adbDataView)
  .component('adbUbDataView', adbUbDataView)
  .component('adbInfoblockView', adbInfoblockView);
