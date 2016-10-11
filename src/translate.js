import {en} from './i18n/en';
import {mn} from './i18n/mn';

export default translateConfig;

/** @ngInject */
function translateConfig($translateProvider, $windowProvider) {
  $translateProvider.translations('en', en);
  $translateProvider.translations('mn', mn);

  $translateProvider.useSanitizeValueStrategy('escapeParameters');

  const language = $windowProvider.$get().localStorage.language || 'en';
  $translateProvider.preferredLanguage(language);
}
