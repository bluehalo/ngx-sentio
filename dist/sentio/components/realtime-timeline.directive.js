"use strict";
var core_1 = require('@angular/core');
var sentio = require('@asymmetrik/sentio');
var chart_wrapper_util_1 = require('../util/chart-wrapper.util');
var resize_util_1 = require('../util/resize.util');
var RealtimeTimelineDirective = (function () {
    function RealtimeTimelineDirective(el) {
        // Chart Ready event
        this.chartReady = new core_1.EventEmitter();
        // Interaction events
        this.markerOver = new core_1.EventEmitter();
        this.markerOut = new core_1.EventEmitter();
        this.markerClick = new core_1.EventEmitter();
        // Create the chart
        this.chartWrapper = new chart_wrapper_util_1.ChartWrapper(el, sentio.chart.realtimeTimeline(), this.chartReady);
        // Set up the resizer
        this.resizeUtil = new resize_util_1.ResizeUtil(el, (this.resizeHeight || this.resizeWidth));
    }
    /**
     * For the timeline, both dimensions scale independently
     */
    RealtimeTimelineDirective.prototype.setChartDimensions = function (dim) {
        var resize = false;
        if (null != dim.width && this.chartWrapper.chart.width() !== dim.width) {
            // pin the height to the width
            this.chartWrapper.chart
                .width(dim.width);
            resize = true;
        }
        if (null != dim.height && this.chartWrapper.chart.height() !== dim.height) {
            // pin the height to the width
            this.chartWrapper.chart
                .height(dim.height);
            resize = true;
        }
        if (resize) {
            this.chartWrapper.chart.resize();
        }
    };
    RealtimeTimelineDirective.prototype.onResize = function (event) {
        this.resizeUtil.resizeObserver.next(event);
    };
    RealtimeTimelineDirective.prototype.ngOnInit = function () {
        var _this = this;
        // Initialize the chart
        this.chartWrapper.initialize();
        // register for the marker events
        this.chartWrapper.chart.dispatch().on('markerClick', function (p) { _this.markerClick.emit(p); });
        this.chartWrapper.chart.dispatch().on('markerMouseover', function (p) { _this.markerOver.emit(p); });
        this.chartWrapper.chart.dispatch().on('markerMouseout', function (p) { _this.markerOut.emit(p); });
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
    RealtimeTimelineDirective.prototype.ngOnDestroy = function () {
        this.resizeUtil.destroy();
    };
    RealtimeTimelineDirective.prototype.ngOnChanges = function (changes) {
        var resize = false;
        var redraw = false;
        if (changes['model']) {
            this.chartWrapper.chart.data(this.model);
            redraw = redraw || !changes['model'].isFirstChange();
        }
        if (changes['markers']) {
            this.chartWrapper.chart.markers(this.markers);
            redraw = redraw || !changes['markers'].isFirstChange();
        }
        if (changes['yExtent']) {
            this.chartWrapper.chart.yExtent().overrideValue(this.yExtent);
            redraw = redraw || !changes['yExtent'].isFirstChange();
        }
        if (changes['xExtent']) {
            this.chartWrapper.chart.xExtent().overrideValue(this.xExtent);
            redraw = redraw || !changes['xExtent'].isFirstChange();
        }
        if (changes['fps']) {
            this.chartWrapper.chart.fps(this.fps);
        }
        if (changes['delay']) {
            this.chartWrapper.chart.delay(this.delay);
            redraw = redraw || !changes['delay'].isFirstChange();
        }
        if (changes['interval']) {
            this.chartWrapper.chart.interval(this.interval);
            redraw = redraw || !changes['interval'].isFirstChange();
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
    ], RealtimeTimelineDirective.prototype, "model", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], RealtimeTimelineDirective.prototype, "markers", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], RealtimeTimelineDirective.prototype, "yExtent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], RealtimeTimelineDirective.prototype, "xExtent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], RealtimeTimelineDirective.prototype, "delay", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], RealtimeTimelineDirective.prototype, "fps", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], RealtimeTimelineDirective.prototype, "interval", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], RealtimeTimelineDirective.prototype, "resizeWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], RealtimeTimelineDirective.prototype, "resizeHeight", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RealtimeTimelineDirective.prototype, "chartReady", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RealtimeTimelineDirective.prototype, "markerOver", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RealtimeTimelineDirective.prototype, "markerOut", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RealtimeTimelineDirective.prototype, "markerClick", void 0);
    __decorate([
        core_1.HostListener('window:resize', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], RealtimeTimelineDirective.prototype, "onResize", null);
    RealtimeTimelineDirective = __decorate([
        core_1.Directive({
            selector: 'sentioRealtimeTimeline'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], RealtimeTimelineDirective);
    return RealtimeTimelineDirective;
}());
exports.RealtimeTimelineDirective = RealtimeTimelineDirective;

//# sourceMappingURL=realtime-timeline.directive.js.map
