
class LanguageSwitcherController {
  /** @ngInject */
  constructor($document, $translate, $window, $state) {
    this.$translate = $translate;
    this.$document = $document;
    this.$window = $window;
    this.$state = $state;
  }

  onSwitcherClicked() {
    const currentLang = this.$window.localStorage.language || 'en';
    const newLang = currentLang === 'en' ? 'mn' : 'en';

    if (newLang === 'mn') {
      this.$document.find('html').addClass('cyrillic');
    } else {
      this.$document.find('html').removeClass('cyrillic');
    }

    try {
      // Update the local storage language so it persists across sessions
      this.$window.localStorage.language = newLang;
      this.$translate.use(newLang);
      this.$state.reload();
    } catch (e) {
      // Local storage is disabled or unsupported, just update the translations
      this.$translate.use(newLang);
    }
  }
}

export const languageSwitcher = {
  templateUrl: 'app/i18n/language-switcher/switcher.html',
  controller: LanguageSwitcherController
};
