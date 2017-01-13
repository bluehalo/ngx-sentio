"use strict";
var core_1 = require('@angular/core');
var sentio = require('@asymmetrik/sentio');
var chart_wrapper_util_1 = require('../util/chart-wrapper.util');
var resize_util_1 = require('../util/resize.util');
var DonutChartDirective = (function () {
    function DonutChartDirective(el) {
        // Chart Ready event
        this.chartReady = new core_1.EventEmitter();
        // Create the chart
        this.chartWrapper = new chart_wrapper_util_1.ChartWrapper(el, sentio.chart.donut(), this.chartReady);
        // Set up the resizer
        this.resizeUtil = new resize_util_1.ResizeUtil(el, this.resizeEnabled);
    }
    /**
     * For the donut chart, we pin the height to the width
     * to keep the aspect ratio correct
     */
    DonutChartDirective.prototype.setChartDimensions = function (dim) {
        if (null != dim.width && this.chartWrapper.chart.width() !== dim.width) {
            // pin the height to the width
            this.chartWrapper.chart
                .width(dim.width)
                .height(dim.width)
                .resize();
        }
    };
    DonutChartDirective.prototype.onResize = function (event) {
        this.resizeUtil.resizeObserver.next(event);
    };
    DonutChartDirective.prototype.ngOnInit = function () {
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
    DonutChartDirective.prototype.ngOnDestroy = function () {
        this.resizeUtil.destroy();
    };
    DonutChartDirective.prototype.ngOnChanges = function (changes) {
        var resize = false;
        var redraw = false;
        if (changes['model']) {
            this.chartWrapper.chart.data(this.model);
            redraw = redraw || !changes['model'].isFirstChange();
        }
        if (changes['duration']) {
            this.chartWrapper.chart.duration(this.duration);
        }
        if (changes['colorScale']) {
            this.chartWrapper.chart.colorScale(this.colorScale);
            redraw = redraw || !changes['colorScale'].isFirstChange();
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
    ], DonutChartDirective.prototype, "model", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DonutChartDirective.prototype, "colorScale", void 0);
    __decorate([
        core_1.Input('resize'), 
        __metadata('design:type', Boolean)
    ], DonutChartDirective.prototype, "resizeEnabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DonutChartDirective.prototype, "duration", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DonutChartDirective.prototype, "chartReady", void 0);
    __decorate([
        core_1.HostListener('window:resize', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DonutChartDirective.prototype, "onResize", null);
    DonutChartDirective = __decorate([
        core_1.Directive({
            selector: 'sentioDonutChart'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], DonutChartDirective);
    return DonutChartDirective;
}());
exports.DonutChartDirective = DonutChartDirective;

//# sourceMappingURL=donut-chart.directive.js.map
