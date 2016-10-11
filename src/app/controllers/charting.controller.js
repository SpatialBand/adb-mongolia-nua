/* @ngInject */
export function ChartingController($scope, $attrs, $element, Utils) {
  let defaultMargins = {left: 30, top: 10, bottom: 30, right: 10};
  // TODO: Refactor this so we don't use $scope to store internal state. We
  // shouldn't be using the $scope variable like that, it leads to "Scope Soup"
  // which makes the code harder to follow.
  $scope.config = {};

  $scope.setDefaultMargins = margins => {
    defaultMargins = margins;
  };

  // Configures the scope.config object with the defaults selected, overriding from
  //  directive attributes if the attribute exists
  // Also initializes the margins object separately from the one-way bound attributes
  $scope.configure = defaults => {
    for (const key of Object.keys(defaults)) {
      const attr = $attrs[key];
      $scope.config[key] = (attr === undefined) ? defaults[key] : $scope.$eval(attr);
    }
    $scope.config.margin = initializeMargins($attrs.margin);
    $scope.plotComplete = false;
  };

  // Wrapper for the plot function, called from $scope.$watch
  $scope.redraw = function (data) {
    if (!data || $scope.plotComplete || ($scope.config.lazyLoad && !Utils.inViewPort($element))) {
      return;
    }
    $scope.plot(data);
    if (!$scope.allowRedraw) {
      $scope.plotComplete = true;
    }
  };

  // OVERRIDE
  $scope.plot = function () {};

  $scope.$watch('data', newData => {
    $scope.redraw(newData);
  });

  Utils.onPanelSnap($element, () => {
    $scope.redraw($scope.data);
  });

  /**
   * Init margins when passed either an object with properties left/top/bottom/right or an int
   *
   * @param margins Int|Object
   *
   * @returns Object {left: Int, top: Int, bottom: Int, right: Int}
   */
  function initializeMargins(margins) {
    let margin = ($scope.$eval(margins) || defaultMargins);
    if (typeof margin !== 'object') {
      // we were passed a vanilla int, convert to full margin object
      margin = {left: margin, top: margin, bottom: margin, right: margin};
    }
    return margin;
  }
}
