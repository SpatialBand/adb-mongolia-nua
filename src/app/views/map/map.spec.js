import angular from 'angular';
import 'angular-mocks';
import {adbMapView} from './map';

describe('map view component', () => {
  beforeEach(() => {
    angular
      .module('adb.views', ['app/views/map/map.html'])
      .component('adbMapView', adbMapView);
    angular.mock.module('adb.views');
  });

  it('should render something', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<adb-map-view></adb-map-view>')($rootScope);
    $rootScope.$digest();
    const div = element.find('div');
    expect(div.length).toBeGreaterThan(0);
  }));
});
