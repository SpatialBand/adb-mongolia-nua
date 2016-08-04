
class LanguageSwitcherController {
  /** @ngInject */
  constructor($document, $translate) {
    this.$translate = $translate;
    this.$document = $document;
  }

  onSwitcherClicked() {
    const currentLang = this.$translate.use();
    const newLang = currentLang === 'en' ? 'mn' : 'en';
    if (newLang === 'mn') {
      this.$document.find('html').addClass('cyrillic');
    } else {
      this.$document.find('html').removeClass('cyrillic');
    }
    this.$translate.use(newLang);
  }
}

export const languageSwitcher = {
  templateUrl: 'app/i18n/language-switcher/switcher.html',
  controller: LanguageSwitcherController
};
