import { select as d3_select } from 'd3-selection';
/**
 * Wrapper for chart info
 */
var ChartWrapper = /** @class */ (function () {
    /**
     * Creates the chart, binds it to the dom element.
     * This doesn't do any DOM manipulation yet.
     * @param el
     * @param chart
     */
    function ChartWrapper(el, chart, chartReady) {
        this.chartElement = d3_select(el.nativeElement);
        this.chart = chart;
        this.chartReady = chartReady;
    }
    /**
     * Initializes the chart, creating its DOM structure
     */
    ChartWrapper.prototype.initialize = function () {
        this.chart.init(this.chartElement);
        this.chartReady.emit(this.chart);
    };
    return ChartWrapper;
}());
export { ChartWrapper };
//# sourceMappingURL=chart-wrapper.util.js.map