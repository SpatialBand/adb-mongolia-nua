import angular from 'angular';

const config = {
  carto: {
    accountName: 'adbmongolia'
  },
  mapSections: {
    people: {
      title: 'People',
      icon: 'icon-group',
      visualizations: [{
        id: 'a98489e1-9e4f-4858-b900-f01b10c62461',
        field: 'pop14',
        title: 'Population 2014'
      }, {
        id: '4351188e-54e2-11e6-9e3b-0e3ebc282e83',
        field: 'pchn9514',
        title: 'Population Change 1995-2014'
      }]
    },
    economy: {
      title: 'Economy',
      icon: 'icon-briefcase',
      visualizations: []
    },
    transportation: {
      title: 'Transportation',
      icon: 'icon-bus',
      visualizations: []
    },
    education: {
      title: 'Education',
      icon: 'icon-book',
      visualizations: []
    }
  }
};

export const appConfig = 'adb.config';

angular.module(appConfig, [])
  .constant('Config', config);
