import angular from 'angular';

import {NationalConfig} from './config/national';
import {UlaanbaatarConfig} from './config/ulaanbaatar';

const config = {
  carto: {
    accountName: 'adbmongolia'
  },
  metadata: {
    table: 'soums',
    fields: [{
      field: 'soum',
      key: 'soum_name'
    }, {
      field: 'aimag',
      key: 'aimag_name'
    }]
  }
};

export const appConfig = 'adb.config';

angular.module(appConfig, [])
  .constant('Config', config)
  .constant('NationalConfig', NationalConfig)
  .constant('UlaanbaatarConfig', UlaanbaatarConfig);
