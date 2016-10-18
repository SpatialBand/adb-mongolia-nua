export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(false).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      template: '<adb-home-view></adb-home-view>'
    })
    .state('map', {
      url: '/:dataConfigKey/map',
      template: '<adb-map-view></adb-map-view>'
    })
    .state('data', {
      url: '/:dataConfigKey/data/:soumCode',
      template: '<adb-data-view></adb-data-view>'
    });
}
