import angular from 'angular';

const config = {
  carto: {
    accountName: 'adbmongolia'
  },
  map: {
    basemap: {
      url: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      options: {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
        maxZoom: 19
      }
    },
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
  },
  mapSections: {
    people: {
      title: 'People',
      icon: 'icon-group',
      table: 'soums',
      visualizations: [{
        id: 'a98489e1-9e4f-4858-b900-f01b10c62461',
        field: 'pop14',
        title: 'Population 2014'
      }, {
        id: '4351188e-54e2-11e6-9e3b-0e3ebc282e83',
        field: 'pchn9514',
        title: 'Population Change 1995-2014',
        isChange: true
      }, {
        id: '8682cd34-54e5-11e6-8a4c-0e3ebc282e83',
        field: 'sh14',
        title: '% of Mongolia\'s Pop 2014',
        isPercent: true
      }, {
        id: '7a5a3225-0df6-475e-9aed-b8bc9ca76319',
        field: 'shch9514',
        title: 'Change in % of Mongolia\'s Pop 1995-2014',
        isChange: true,
        isPercent: true
      }, {
        id: 'd48fb3da-54e9-11e6-bd9f-0ecd1babdde5',
        field: 'den14',
        title: 'Population Density 2014'
      }]
    },
    households: {
      title: 'Households',
      icon: 'icon-bus',
      table: 'soums',
      visualizations: [{
        id: '174eb7cc-cc92-449b-9773-e3d5aab64e41',
        field: 'hh14',
        title: '# Households 2014'
      }, {
        id: '6319865d-63cc-4700-b21c-a71597acf649',
        field: 'chnhh614',
        title: 'Change in # Households 2006-2014',
        isChange: true
      }, {
        id: '87e33054-54f1-11e6-aa75-0ee66e2c9693',
        field: 'hhh14',
        title: '# Herder Households 2014'
      }, {
        id: '83ce9698-8481-4ef9-8f3c-4efed0c372de',
        field: 'hpc14',
        title: 'Herder Households as % Total Households 2014',
        isPercent: true
      }, {
        id: 'e179f47f-7a0d-4c03-b1fc-b9cd1b7e7820',
        field: 'chhpc0613',
        title: 'Change in Herder\'s Share (%) of Total Households 2006-2013',
        isChange: true,
        isPercent: true
      }]
    },
    economy: {
      title: 'Economy',
      icon: 'icon-briefcase',
      table: 'soums',
      visualizations: [{
        id: 'accdffb8-54f4-11e6-af54-0e233c30368f',
        field: 'ent14',
        title: 'Total # of Enterprises 2014'
      }, {
        id: '358c1220-5501-11e6-9e3b-0e3ebc282e83',
        field: 'ent0014',
        title: 'Change in # of Enterprises 200-2014',
        isChange: true
      }, {
        id: '3f12a98a-06c6-4d3e-a027-8d14038a7c26',
        field: 'man14',
        title: 'Total # of Manufacturing Enterprises 2014'
      }, {
        id: 'dbc52e98-55a5-11e6-871e-0e05a8b3e3d7',
        field: 'chman0014',
        title: 'Change in # of Manufacturing Enterprises 2000-2014',
        isChange: true
      // }, {
      //   id: '',
      //   field: 'pcpov11',
      //   title: '% of Population in Poverty 2011',
      //   isPercent: true
      }, {
        id: '9adf865a-337a-4960-8f1d-2bd0c6420f56',
        field: 'chpcpov11',
        title: '% Change of Population in Poverty 2002-2011',
        isChange: true,
        isPercent: true,
        reverseColor: true
      }, {
        id: '9de67942-55a5-11e6-b640-0e3ff518bd15',
        field: 'sdi',
        table: 'sdi',
        title: 'SOUM Development Index 2014'
      }]
    },
    infrastructure: {
      title: 'Infrastructure',
      icon: 'icon-book',
      table: 'soums',
      visualizations: [{
        id: '9db8a964-559a-11e6-9426-0e3ff518bd15',
        field: 'pcger10',
        title: '% of Population Living in Ger 2010',
        isPercent: true
      }, {
        id: '0389f50a-55a4-11e6-b115-0e3ff518bd15',
        field: 'pcsan10',
        title: '% of Population with Indoor Sanitation 2010',
        isPercent: true
      }, {
        id: '9156764d-1ff2-49ed-bd4c-1266d26fa9dd',
        field: 'pcwat10',
        title: '% of Population with Access to Piped Water 2010',
        isPercent: true
      }, {
        id: '370ec9b6-55a2-11e6-9cb6-0ee66e2c9693',
        field: 'pcsw10',
        title: '% of Population with Organized Solid Waste Disposal 2010',
        isPercent: true
      }, {
        id: '8e51eb57-e463-4e83-9802-9a6fedc8a1fc',
        field: 'pcint10',
        title: '% of Population with Access to Internet 2010',
        isPercent: true
      }]
    }
  }
};

export const appConfig = 'adb.config';

angular.module(appConfig, [])
  .constant('Config', config);
