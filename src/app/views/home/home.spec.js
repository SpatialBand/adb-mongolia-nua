import angular from 'angular';
import 'angular-mocks';
import {adbHomeView} from './home';

describe('home view component', () => {
  beforeEach(() => {
    angular
      .module('adb.views', ['app/views/home/home.html'])
      .component('adbHomeView', adbHomeView);
    angular.mock.module('adb.views');
  });

  it('should render something', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<adb-home-view></adb-home-view>')($rootScope);
    $rootScope.$digest();
    const main = element.find('main');
    expect(main.html().trim()).not.toBe('');
  }));
});
