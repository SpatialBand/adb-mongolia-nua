import angular from 'angular';

import {NationalConfig} from './config/national';
import {UlaanbaatarConfig} from './config/ulaanbaatar';

const config = {
  carto: {
    accountName: 'adbmongolia'
  }
};

export const appConfig = 'adb.config';

angular.module(appConfig, [])
  .constant('Config', config)
  .constant('NationalConfig', NationalConfig)
  .constant('UlaanbaatarConfig', UlaanbaatarConfig);
