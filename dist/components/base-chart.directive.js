"use strict";
var d3 = require('d3');
/**
 * Base Directive Object for all charts
 */
var BaseChartDirective = (function () {
    function BaseChartDirective(el, chart) {
        this.chartElement = d3.select(el.nativeElement);
        this.chart = chart;
        this.chart.init(this.chartElement);
        // Extract the dimensions of the chart
        var width = this.getPixelDimension(this.chartElement[0][0].style.width);
        var height = this.getPixelDimension(this.chartElement[0][0].style.height);
        this.setChartDimensions(width, height, true);
    }
    /**
     * Determines the numerical dimension given a string representation
     * Assumes the string is in the form 'NNNNNpx', more specifically
     * an arbitrarily long sequence of digits terminated by 'px'
     *
     * @param dimStr A string representation of the pixel size
     * @returns {number} the numerical representation of the pixel size
     */
    BaseChartDirective.prototype.getPixelDimension = function (dimStr) {
        var dim;
        if (null != dimStr && '' !== dimStr) {
            dim = parseFloat(dimStr.substring(0, dimStr.length - 2));
            if (null == dim || isNaN(dim)) {
                dim = undefined;
            }
        }
        return dim;
    };
    /**
     * Resize the component
     */
    BaseChartDirective.prototype.resize = function () {
        // Get the raw body element
        var body = document.body;
        // Cache the old overflow style
        var overflow = body.style.overflow;
        body.style.overflow = 'hidden';
        // The first element child of our selector should be the <div> we injected
        var rawElement = this.chartElement[0][0].firstElementChild;
        // Derive size of the parent (there are several ways to do this depending on the parent)
        var width = rawElement.attributes.width || rawElement.style.width || rawElement.clientWidth;
        var height = rawElement.attributes.height || rawElement.style.height || rawElement.clientHeight;
        // Reapply the old overflow setting
        body.style.overflow = overflow;
        this.setChartDimensions(width, height, false);
    };
    /**
     * Manage a delayed resize of the component
     */
    BaseChartDirective.prototype.delayResize = function () {
        var _this = this;
        if (null != this.resizeTimer) {
            clearTimeout(this.resizeTimer);
        }
        this.resizeTimer = setTimeout(function () { return _this.resize(); }, 200);
    };
    return BaseChartDirective;
}());
exports.BaseChartDirective = BaseChartDirective;

//# sourceMappingURL=base-chart.directive.js.map
