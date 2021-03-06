import angular from 'angular';

import * as _ from 'lodash';
import * as d3 from 'd3';

import {adbViewModule} from './app/views/index';
import 'angular-ui-router';
import 'angular-translate/dist/angular-translate';
import routesConfig from './routes';
import translateConfig from './translate';

// Ensure css/fontello are bundled
import './assets/sass/main.scss';
import './assets/fonts/fontello/css/fontello.css';

angular
  .module('app', [adbViewModule, 'ui.router', 'pascalprecht.translate'])
  .constant('_', _)
  .constant('d3', d3)
  .config(routesConfig)
  .config(translateConfig);
