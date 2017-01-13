"use strict";
var core_1 = require('@angular/core');
var sentio = require('@asymmetrik/sentio');
var chart_wrapper_util_1 = require('../util/chart-wrapper.util');
var resize_util_1 = require('../util/resize.util');
var VerticalBarChartDirective = (function () {
    function VerticalBarChartDirective(el) {
        // Chart Ready event
        this.chartReady = new core_1.EventEmitter();
        // Create the chart
        this.chartWrapper = new chart_wrapper_util_1.ChartWrapper(el, sentio.chart.verticalBars(), this.chartReady);
        // Set up the resizer
        this.resizeUtil = new resize_util_1.ResizeUtil(el, this.resizeEnabled);
    }
    /**
     * For The vertical bar chart, we just resize width
     */
    VerticalBarChartDirective.prototype.setChartDimensions = function (dim) {
        if (null != dim.width && this.chartWrapper.chart.width() !== dim.width) {
            // pin the height to the width
            this.chartWrapper.chart
                .width(dim.width)
                .resize();
        }
    };
    VerticalBarChartDirective.prototype.onResize = function (event) {
        this.resizeUtil.resizeObserver.next(event);
    };
    VerticalBarChartDirective.prototype.ngOnInit = function () {
        var _this = this;
        // Initialize the chart
        this.chartWrapper.initialize();
        // Set up the resize callback
        this.resizeUtil.resizeSource
            .subscribe(function () {
            // Do the resize operation
            _this.setChartDimensions(_this.resizeUtil.getSize());
            _this.chartWrapper.chart.redraw();
        });
        // Set the initial size of the chart
        this.setChartDimensions(this.resizeUtil.getSize());
        this.chartWrapper.chart.redraw();
    };
    VerticalBarChartDirective.prototype.ngOnDestroy = function () {
        this.resizeUtil.destroy();
    };
    VerticalBarChartDirective.prototype.ngOnChanges = function (changes) {
        var resize = false;
        var redraw = false;
        if (changes['model']) {
            this.chartWrapper.chart.data(this.model);
            redraw = redraw || !changes['model'].isFirstChange();
        }
        if (changes['widthExtent']) {
            this.chartWrapper.chart.widthExtent().overrideValue(this.widthExtent);
            redraw = redraw || !changes['widthExtent'].isFirstChange();
        }
        if (changes['resize']) {
            this.resizeUtil.enabled = this.resizeEnabled;
            resize = resize || (this.resizeEnabled && !changes['resize'].isFirstChange());
            redraw = redraw || resize;
        }
        // Only redraw once if necessary
        if (resize) {
            this.chartWrapper.chart.resize();
        }
        if (redraw) {
            this.chartWrapper.chart.redraw();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], VerticalBarChartDirective.prototype, "model", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], VerticalBarChartDirective.prototype, "widthExtent", void 0);
    __decorate([
        core_1.Input('resize'), 
        __metadata('design:type', Boolean)
    ], VerticalBarChartDirective.prototype, "resizeEnabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], VerticalBarChartDirective.prototype, "duration", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], VerticalBarChartDirective.prototype, "chartReady", void 0);
    __decorate([
        core_1.HostListener('window:resize', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], VerticalBarChartDirective.prototype, "onResize", null);
    VerticalBarChartDirective = __decorate([
        core_1.Directive({
            selector: 'sentioVerticalBarChart'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], VerticalBarChartDirective);
    return VerticalBarChartDirective;
}());
exports.VerticalBarChartDirective = VerticalBarChartDirective;
;

//# sourceMappingURL=vertical-bar-chart.directive.js.map
