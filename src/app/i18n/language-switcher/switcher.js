
class LanguageSwitcherController {
  /** @ngInject */
  constructor($translate) {
    this.$translate = $translate;
  }

  onSwitcherClicked() {
    const currentLang = this.$translate.use();
    const newLang = currentLang === 'en' ? 'mn' : 'en';
    this.$translate.use(newLang);
  }
}

export const languageSwitcher = {
  templateUrl: 'app/i18n/language-switcher/switcher.html',
  controller: LanguageSwitcherController
};
