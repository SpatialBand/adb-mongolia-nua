import angular from 'angular';

// Define object config of properties for this chart directive
export const HistogramDefaults = {
  plotWidthPercentage: 0.8,
  barRadius: 1,
  transitionMillis: 500,
  lazyLoad: false,
  chartColor: '#000000'
};

export function HistogramDirective($log, $window, HistogramDefaults, d3, _) {
  const PLOT_CLASS = 'adb-histogram';

  // Default color to use when a color isn't provided
  const defaultColor = 'LightGray';

  // Begin directive module definition
  const module = {
    restrict: 'EA',
    template: ['<svg class="chart"></svg><ul class="legend">',
               '<li ng-repeat="callout in callouts" ng-if="isNumber(callout.value[valueField])"',
                  'class="bullet-{{callout.type}}">',
                  '{{callout.label|translate}}',
                  '<i style="background-color: {{callout.color}}">{{callout.value[valueField]|comparatize}}</i>',
               '</li></ul>'].join(''),
    controller: 'ChartingController',
    scope: {
      data: '<',        // Required
      id: '@',        // Required
      plotWidthPercentage: '@',
      barRadius: '@',
      valueField: '<',     // Required
      callouts: '<',
      chartColor: '&',
      transitionMillis: '@',
      allowRedraw: '@',
      lazyLoad: '@'
    },

    link: ($scope, element, attrs) => {
      $scope.setDefaultMargins(10);
      $scope.configure(HistogramDefaults);
      $scope.isNumber = isFinite;

      let drawWidth = 800;
      let drawHeight = 400;

      // D3 margin, sizing, and spacing code
      element.addClass(PLOT_CLASS);
      let chartId = attrs.id;
      if (!chartId) {
        const randomId = Math.floor(Math.random() * 1000000001).toString();
        chartId = `adb-histogram-${randomId}`;
        element.attr('id', chartId);
      }
      const chart = d3.select(`#${chartId} svg.chart`)
        // responsive SVG needs these 2 attributes and no width and height attr
        .attr("preserveAspectRatio", "none")
        .attr("viewBox", `0 0 ${drawWidth} ${drawHeight}`)
        .append('g');

      $scope.$watch('calloutValues', () => {
        $scope.redraw($scope.data);
      });

      angular.element($window).bind('resize', () => {
        const chart = d3.select(`#${chartId} svg.chart`);
        if (chart.node().clientWidth !== drawWidth) {
          drawWidth = chart.node().clientWidth;
          drawHeight = drawWidth / 2;
          chart.attr("viewBox", `0 0 ${drawWidth} ${drawHeight}`);
          $scope.plot($scope.data);
        }
      });

      // Overridden ChartingController method
      /**
        Data structure:
      */
      $scope.plot = data => {
        if (!data) {
          return;
        }

        // Clear all drawn chart elements before redrawing
        d3.selectAll(`#${chartId} .chart > g > *`).remove();

        // Filter values < 1 for log scale
        data = _.chain(data) // Filter out less than 1 and return the log10 of values
          .map($scope.valueField)
          .map(v => (v < 1) ? 1 : v)
          .map(v => Math.log(v) / Math.log(10))
          .value();

        if (data.length === 0) {
          return;
        }

        const maxValue = _.max(data);
        const minValue = _.min(data);

        // Scale for log values
        const xKDE = d3.scale.linear()
          .domain([minValue, maxValue])
          .range([0, drawWidth]);
        const yKDE = d3.scale.linear()
          .domain([0, 1])
          .range([drawHeight, 30]);
        // KDEstimator with probability distribution tapering out with a bandwidth of 0.2
        // with the epanechnikov kernel function
        const bins = buckets(minValue, maxValue, 100);
        const kde = kernelDensityEstimator(epanechnikovKernel(1), bins);
        const estimate = kde(data); // Estimated density

        // Plot KDE and callouts
        const plotArea = d3.svg.area()
          .x(d => {
            return xKDE(d[0]);
          })
          .y0(drawHeight)
          .y1(d => {
            return yKDE(d[1]);
          });
        chart.append('path') // Plot area for KDE
          .datum(estimate)
          .attr('class', 'kde plot')
          .attr('d', plotArea)
          .attr('fill', $scope.chartColor);
        if ($scope.callouts) {
          for (let i = 0; i < $scope.callouts.length; i++) {
            const callout = $scope.callouts[i];
            const value = callout.value[$scope.valueField];
            if (isFinite(value)) { // Don't plot null vals - null is not 0
              chart.append('rect') // Callouts - minValue is used for cases below 1 to avoid negInfinity on log10
                .attr('x', xKDE(value >= 1 ? Math.log(value) / Math.log(10) : minValue))
                .attr('y', 0)
                .attr('height', drawHeight)
                .attr('width', '3px')
                .attr('fill', callout.color || defaultColor);
            }
          }
        }

        /* Debugging logs
        console.log('Config:', {
          min: minValue,
          max: maxValue,
          callouts: calloutValues
        });
        console.log('Data:', data);
         */

        function buckets(min, max, count) {
          const delta = (max - min) / (count - 1);
          return _.map(_.range(count), i => min + delta * i);
        }

        function kernelDensityEstimator(kernel, x) {
          return sample => {
            return x.map(x => {
              return [x, d3.mean(sample, v => {
                return kernel(x - v);
              })];
            });
          };
        }

        function epanechnikovKernel(scale) {
          return function (u) {
            u /= scale;
            return Math.abs(u) <= 1 ? 0.75 * (1 - u * u) / scale : 0;
          };
        }
      };
    }
  };

  return module;
}
