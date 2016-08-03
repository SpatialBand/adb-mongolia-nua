import angular from 'angular';
import 'angular-mocks';
import {adbNavbarView} from './navbar';

describe('navbar view component', () => {
  beforeEach(() => {
    angular
      .module('adb.views', ['app/views/navbar/navbar.html'])
      .component('adbNavbarView', adbNavbarView);
    angular.mock.module('adb.views');
  });

  it('should render something', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<adb-navbar-view></adb-navbar-view>')($rootScope);
    $rootScope.$digest();
    const nav = element.find('nav');
    expect(nav.length).toBeGreaterThan(0);
  }));
});
