import angular from 'angular';

import {dataConfig} from './data-config';

const config = {
  carto: {
    accountName: 'adbmongolia'
  },
  map: {
    basemaps: {
      default: {
        url: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        title: 'MAP_DEFAULT_TITLE',
        options: {
          attribution: 'MAP_OSM_ATTRIBUTION',
          maxZoom: 19
        }
      },
      alternative: [{
        url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
        title: 'MAP_ARCGIS_WORLD_TOPO_MAP_TITLE',
        options: {
          attribution: 'MAP_ARCGIS_WORLD_TOPO_MAP_ATTRIBUTION',
          maxZoom: 19
        }
      }, {
        url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        title: 'MAP_ARCGIS_WORLD_IMAGERY_TITLE',
        options: {
          attribution: 'MAP_ARCGIS_WORLD_IMAGERY_ATTRIBUTION',
          maxZoom: 19
        }
      }]
    },
    overlays: [{
      id: '6626851e-6f8c-11e6-a376-0ee66e2c9693',
      title: 'MAP_CLUSTERS_TITLE',
      zIndex: 102
    }, {
      id: '256705a8-6f8c-11e6-b205-0e233c30368f',
      title: 'MAP_ROADWAYS_TITLE',
      zIndex: 101
    }, {
      id: '834fd12c-6f8c-11e6-b15b-0ee66e2c9693',
      title: 'MAP_SETTLEMENTS_TITLE',
      zIndex: 103
    }],
    options: {
      zoomControl: false
    },
    view: {
      center: [46.8625, 103.8467],
      zoom: 5
    }
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
  .constant('DataConfig', dataConfig);
