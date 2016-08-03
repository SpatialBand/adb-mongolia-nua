import angular from 'angular';

import {adbViewModule} from './app/views/index';
import 'angular-ui-router';
import routesConfig from './routes';

// Ensure css/fontello are bundled
import './assets/sass/main.scss';
import './assets/fonts/fontello/css/fontello.css';

angular
  .module('app', [adbViewModule, 'ui.router'])
  .config(routesConfig);
