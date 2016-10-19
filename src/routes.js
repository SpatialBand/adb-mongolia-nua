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
      url: '/national/map',
      template: '<adb-map-view></adb-map-view>'
    })
    .state('data', {
      url: '/national/data/:soumCode',
      template: '<adb-data-view></adb-data-view>'
    })
    .state('ub-map', {
      url: '/ulaanbaatar/map',
      template: '<adb-ub-map-view></adb-ub-map-view>'
    })
    .state('ub-data', {
      url: '/ulaanbaatar/data/:khorooId',
      template: '<adb-ub-data-view></adb-ub-data-view>'
    });
}
