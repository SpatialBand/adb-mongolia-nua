import angular from 'angular';
import 'angular-mocks';
import {adbDataView} from './data';

describe('data view component', () => {
  beforeEach(() => {
    angular
      .module('adb.views', ['app/views/data/data.html'])
      .component('adbDataView', adbDataView);
    angular.mock.module('adb.views');
  });

  it('should render something', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<adb-data-view></adb-data-view>')($rootScope);
    $rootScope.$digest();
    const main = element.find('main');
    expect(main.length).toBeGreaterThan(0);
  }));
});
