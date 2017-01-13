"use strict";
var d3 = require('d3');
/**
 * Wrapper for chart info
 */
var ChartWrapper = (function () {
    /**
     * Creates the chart, binds it to the dom element.
     * This doesn't do any DOM manipulation yet.
     * @param el
     * @param chart
     */
    function ChartWrapper(el, chart, chartReady) {
        this.chartElement = d3.select(el.nativeElement);
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
exports.ChartWrapper = ChartWrapper;

//# sourceMappingURL=chart-wrapper.util.js.map
