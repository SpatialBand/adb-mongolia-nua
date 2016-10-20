/** @ngInject */
export function Comparatize($log, $filter, numberFilter) {
  return function (value, isComparison, isPercent) {
    if (value === undefined) {
      // The filter was called before the form's controller was instantiated.
      // Returning undefined tells Angular that the value is still being
      // calculated and causes the filter to play nicely with one-time-bindings.
      return value;
    }
    if (value === null) {
      return $filter('translate')("DATA_NO_DATA");
    }

    // Round to 2 digits to work around numberFilter's 3 digit default
    // (You can specify the number of decimal digits for numberFilter, but then
    //   it always uses exactly that many digits, even for whole numbers)
    value = Math.round(value * 100) / 100;
    let output = numberFilter(value);

    if (isComparison && value > 0) {
      output = `+${output}`;
    }
    if (isPercent) {
      output = `${output}%`;
    }

    return output;
  };
}
