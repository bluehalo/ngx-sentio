/**
 * Wrapper for common timeline stuff
 */
var TimelineUtil = /** @class */ (function () {
    /**
     * Creates the chart, binds it to the dom element.
     * This doesn't do any DOM manipulation yet.
     * @param el
     * @param chart
     */
    function TimelineUtil(chartWrapper) {
        this.chartWrapper = chartWrapper;
    }
    TimelineUtil.prototype.setChartDimensions = function (dim, resizeWidth, resizeHeight, force) {
        if (force === void 0) { force = false; }
        var resize = false;
        if ((force || resizeWidth) && null != dim.width && this.chartWrapper.chart.width() !== dim.width) {
            // pin the height to the width
            this.chartWrapper.chart
                .width(dim.width);
            resize = true;
        }
        if ((force || resizeHeight) && null != dim.height && this.chartWrapper.chart.height() !== dim.height) {
            // pin the height to the width
            this.chartWrapper.chart
                .height(dim.height);
            resize = true;
        }
        if (resize) {
            this.chartWrapper.chart.resize();
        }
    };
    return TimelineUtil;
}());
export { TimelineUtil };
//# sourceMappingURL=timeline.util.js.map