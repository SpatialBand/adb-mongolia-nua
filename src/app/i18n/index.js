
import angular from 'angular';

import 'angular-translate/dist/angular-translate';

import {languageSwitcher} from './language-switcher/switcher';

export const adbLangModule = 'adb.i18n';

angular
  .module(adbLangModule, ['pascalprecht.translate'])
  .component('adbLanguageSwitcher', languageSwitcher);
