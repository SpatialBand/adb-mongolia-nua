// Define object config of properties for this chart directive
export const HistogramDefaults = {
  plotWidthPercentage: 0.8,
  barRadius: 1,
  transitionMillis: 500,
  lazyLoad: false,
  chartColor: '#000000'
};

export function HistogramDirective($log, HistogramDefaults, d3, _) {
  const PLOT_CLASS = 'adb-histogram';

  // Default color to use when a color isn't provided
  const defaultColor = 'LightGray';

  // Begin directive module definition
  const module = {
    restrict: 'EA',
    template: '<svg class="chart"></svg>',
    controller: 'ChartingController',
    scope: {
      data: '<',        // Required
      id: '@',        // Required
      plotWidth: '<',
      plotHeight: '<',
      plotWidthPercentage: '@',
      barRadius: '@',
      valueField: '<',     // Required
      margin: '&',
      calloutValues: '<',
      calloutColors: '<',
      chartColor: '&',
      transitionMillis: '@',
      allowRedraw: '@',
      lazyLoad: '@'
    },

    link: ($scope, element, attrs) => {
      $scope.setDefaultMargins(10);
      $scope.configure(HistogramDefaults);
      const config = $scope.config;
      const margin = config.margin;
      let calloutValues = $scope.calloutValues;
      const calloutColors = $scope.calloutColors;

      // D3 margin, sizing, and spacing code
      element.addClass(PLOT_CLASS);
      let chartId = attrs.id;
      if (!chartId) {
        const randomId = Math.floor(Math.random() * 1000000001).toString();
        chartId = `adb-histogram-${randomId}`;
        element.attr('id', chartId);
      }
      const chart = d3.select(`#${chartId} svg.chart`)
        .attr('width', $scope.plotWidth)
        .attr('height', $scope.plotHeight)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      $scope.$watch('calloutValues', newValue => {
        calloutValues = newValue;
        $scope.redraw($scope.data);
      });

      $scope.$watchGroup(['plotWidth', 'plotHeight'], () => {
        d3.select(`#${chartId} svg.chart`).attr('width', $scope.plotWidth);
        $scope.redraw($scope.data);
      });

      // Overridden ChartingController method
      /**
        Data structure:
      */
      $scope.plot = data => {
        if (!$scope.plotWidth || !$scope.plotHeight || !data) {
          return;
        }

        // Clear all drawn chart elements before redrawing
        d3.selectAll(`#${chartId} .chart > g > *`).remove();

        // Filter values < 1 for log scale
        data = _.chain(data) // Filter out less than 1 and return the log10 of values
          .filter(row => {
            return row[$scope.valueField] >= 1;
          }).map(d => {
            return Math.log(d[$scope.valueField]) / Math.log(10);
          }).value();

        if (data.length === 0) {
          return;
        }

        const maxValue = _.max(data);
        const minValue = _.min(data);
        const height = $scope.plotHeight - margin.top - margin.bottom;
        const width = $scope.plotWidth - margin.left - margin.right;

        // Scale for log values
        const xKDE = d3.scale.linear()
          .domain([minValue, maxValue])
          .range([0, width]);
        const yKDE = d3.scale.linear()
          .domain([0, 1])
          .range([height, 30]);
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
          .y0(height)
          .y1(d => {
            return yKDE(d[1]);
          });
        chart.append('path') // Plot area for KDE
          .datum(estimate)
          .attr('class', 'kde plot')
          .attr('d', plotArea)
          .attr('fill', $scope.chartColor);
        if (calloutValues) {
          for (let i = 0; i < calloutValues.length; i++) {
            if (calloutValues[i] !== null) { // Don't plot null vals - null is not 0
              chart.append('rect') // Callouts - minValue is used for cases below 1 to avoid negInfinity on log10
                .attr('x', xKDE(calloutValues[i] >= 1 ? Math.log(calloutValues[i]) / Math.log(10) : minValue))
                .attr('y', 0)
                .attr('height', height)
                .attr('width', '2px')
                .attr('fill', calloutColors[i] || defaultColor);
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
           const delta = (max - min) / (count-1);
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
