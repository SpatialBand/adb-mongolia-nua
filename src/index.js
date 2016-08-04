import angular from 'angular';

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
  .config(routesConfig)
  .config(translateConfig);
