class InfoblockController {

  /** @ngInject */
  constructor($log) {
    this.$log = $log;
  }

  $onChanges() {
    if (!this.variable) {
      return;
    }

    this.value = this.variable.value;
    this.title = this.variable.title;
    this.isChange = this.variable.isChange;
    this.isPercent = this.variable.isPercent;

    this.colorClass = '';
    if (this.value === null) {
      this.colorClass = 'no-data';
    } else if (this.isChange && this.value !== 0) {
      let ispositive = (this.value > 0);
      if (this.variable.reverseColor) {
        ispositive = !ispositive;
      }
      this.colorClass = ispositive ? 'color-positive' : 'color-negative';
    }
  }
}

export const adbInfoblockView = {
  templateUrl: 'app/views/infoblock/infoblock.html',
  controller: InfoblockController,
  bindings: {
    variable: '<'
  }
};
