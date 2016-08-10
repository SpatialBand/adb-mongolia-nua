
import angular from 'angular';

import {appConfig} from '../../config';
import {SoumData} from './soum-data.service';

export const adbServicesModule = 'adb.services';

angular
  .module(adbServicesModule, [appConfig])
  .service('SoumData', SoumData);
