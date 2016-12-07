"use strict";
var core_1 = require('@angular/core');
var sentio = require('@asymmetrik/sentio');
var base_chart_directive_1 = require('./base-chart.directive');
var RealtimeTimelineDirective = (function (_super) {
    __extends(RealtimeTimelineDirective, _super);
    function RealtimeTimelineDirective(el) {
        _super.call(this, el, sentio.realtime.timeline());
        this.markerOver = new core_1.EventEmitter();
        this.markerOut = new core_1.EventEmitter();
        this.markerClick = new core_1.EventEmitter();
    }
    /**
     * For the timeline, both dimensions scale independently
     */
    RealtimeTimelineDirective.prototype.setChartDimensions = function (width, height, force) {
        if (force === void 0) { force = false; }
        var redraw = false;
        if ((force || this.resizeWidth) && null != this.chart.width) {
            if (null != width && this.chart.width() !== width) {
                this.chart.width(width);
                redraw = true;
            }
        }
        if ((force || this.resizeHeight) && null != this.chart.height) {
            if (null != height && this.chart.height() !== height) {
                this.chart.height(height);
                redraw = true;
            }
        }
        if (redraw) {
            this.chart.resize().redraw();
        }
    };
    RealtimeTimelineDirective.prototype.onResize = function (event) {
        if (this.resizeHeight || this.resizeWidth) {
            this.delayResize();
        }
    };
    RealtimeTimelineDirective.prototype.ngOnInit = function () {
        var _this = this;
        // Do the initial resize if either dimension is supposed to resize
        if (this.resizeHeight || this.resizeWidth) {
            this.resize();
        }
        // register for the marker events
        this.chart.dispatch().on('markerClick', function (p) { _this.markerClick.emit(p); });
        this.chart.dispatch().on('markerMouseover', function (p) { _this.markerOver.emit(p); });
        this.chart.dispatch().on('markerMouseout', function (p) { _this.markerOut.emit(p); });
    };
    RealtimeTimelineDirective.prototype.ngOnChanges = function (changes) {
        var redraw = false;
        // Call the configure function
        if (changes['configureFn'] && changes['configureFn'].isFirstChange()
            && null != changes['configureFn'].currentValue) {
            this.configureFn(this.chart);
        }
        if (changes['model']) {
            this.chart.data(changes['model'].currentValue);
            redraw = true;
        }
        if (changes['markers']) {
            this.chart.markers(changes['markers'].currentValue);
            redraw = true;
        }
        if (changes['yExtent']) {
            this.chart.yExtent().overrideValue(changes['yExtent'].currentValue);
            redraw = true;
        }
        if (changes['xExtent']) {
            this.chart.xExtent().overrideValue(changes['xExtent'].currentValue);
            redraw = true;
        }
        if (changes['duration']) {
            this.chart.duration(changes['duration'].currentValue);
        }
        if (changes['fps']) {
            this.chart.fps(changes['fps'].currentValue);
        }
        if (changes['delay']) {
            this.chart.delay(changes['delay'].currentValue);
            redraw = true;
        }
        if (changes['interval']) {
            this.chart.interval(changes['interval'].currentValue);
            redraw = true;
        }
        if (redraw) {
            this.chart.redraw();
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
        core_1.Input(), 
        __metadata('design:type', Number)
    ], RealtimeTimelineDirective.prototype, "duration", void 0);
    __decorate([
        core_1.Input('configure'), 
        __metadata('design:type', Function)
    ], RealtimeTimelineDirective.prototype, "configureFn", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], RealtimeTimelineDirective.prototype, "markerOver", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], RealtimeTimelineDirective.prototype, "markerOut", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], RealtimeTimelineDirective.prototype, "markerClick", void 0);
    __decorate([
        core_1.HostListener('window:resize', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], RealtimeTimelineDirective.prototype, "onResize", null);
    RealtimeTimelineDirective = __decorate([
        core_1.Directive({
            selector: 'realtime-timeline'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], RealtimeTimelineDirective);
    return RealtimeTimelineDirective;
}(base_chart_directive_1.BaseChartDirective));
exports.RealtimeTimelineDirective = RealtimeTimelineDirective;

//# sourceMappingURL=realtime-timeline.directive.js.map