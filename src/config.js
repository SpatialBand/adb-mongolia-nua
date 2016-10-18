import angular from 'angular';

import {PageConfig} from './config/page-config';

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
  .constant('PageConfig', PageConfig);
