class InfoblockController {

  /** @ngInject */
  constructor($log) {
    this.$log = $log;
  }

  $onChanges() {
    if (!this.variable) {
      return;
    }
    this.$log.log(this);

    this.value = this.variable.value;
    this.title = this.variable.title;

    this.colorClass = '';
    if (this.colorOverride) {
      this.colorClass = `color-${this.colorOverride}`;
    } else if (this.isChange && this.value !== 0) {
      let ispositive = (this.value > 0);
      if (this.reverseColor) {
        ispositive = !ispositive;
      }
      this.colorClass = ispositive ? 'color-positive' : 'color-negative';
    }

    this.value = Math.round(this.value * 100) / 100;

    if (this.value > 0 && this.isChange) {
      this.value = `+${this.value}`;
    }
    if (this.isPercent) {
      this.value = `${this.value}%`;
    }
  }
}

export const adbInfoblockView = {
  templateUrl: 'app/views/infoblock/infoblock.html',
  controller: InfoblockController,
  bindings: {
    variable: '<',
    isChange: '<',
    isPercent: '<',
    reverseColor: '<',
    colorOverride: '@'
  }
};
