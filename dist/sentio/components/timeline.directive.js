"use strict";
var core_1 = require('@angular/core');
var sentio = require('@asymmetrik/sentio');
var chart_wrapper_util_1 = require('../util/chart-wrapper.util');
var resize_util_1 = require('../util/resize.util');
var TimelineDirective = (function () {
    function TimelineDirective(el) {
        // Chart Ready event
        this.chartReady = new core_1.EventEmitter();
        this.filterChange = new core_1.EventEmitter();
        // Interaction events
        this.markerOver = new core_1.EventEmitter();
        this.markerOut = new core_1.EventEmitter();
        this.markerClick = new core_1.EventEmitter();
        /**
         * Did the state of the filter change?
         */
        this.didFilterChange = function (current, previous) {
            // Deep compare the filter
            if (current === previous ||
                (null != current && null != previous
                    && current[0] === previous[0]
                    && current[1] === previous[1])) {
                return false;
            }
            // We know it changed
            return true;
        };
        // Create the chart
        this.chartWrapper = new chart_wrapper_util_1.ChartWrapper(el, sentio.chart.timeline(), this.chartReady);
        // Set up the resizer
        this.resizeUtil = new resize_util_1.ResizeUtil(el, (this.resizeHeight || this.resizeWidth));
    }
    /**
     * For the timeline, both dimensions scale independently
     */
    TimelineDirective.prototype.setChartDimensions = function (dim) {
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
    TimelineDirective.prototype.onResize = function (event) {
        this.resizeUtil.resizeObserver.next(event);
    };
    TimelineDirective.prototype.ngOnInit = function () {
        var _this = this;
        // Initialize the chart
        this.chartWrapper.initialize();
        // register for the marker events
        this.chartWrapper.chart.dispatch().on('markerClick', function (p) { _this.markerClick.emit(p); });
        this.chartWrapper.chart.dispatch().on('markerMouseover', function (p) { _this.markerOver.emit(p); });
        this.chartWrapper.chart.dispatch().on('markerMouseout', function (p) { _this.markerOut.emit(p); });
        // register for the filter end event
        this.chartWrapper.chart.dispatch().on('filterend', function (fs) {
            // If the filter actually changed, emit the event
            if (_this.didFilterChange(fs, _this.filterState)) {
                setTimeout(function () { _this.filterChange.emit(fs); });
            }
        });
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
        // Set the filter (if it exists)
        if (null != this.filterState) {
            this.chartWrapper.chart.setFilter(this.filterState);
        }
    };
    TimelineDirective.prototype.ngOnDestroy = function () {
        this.resizeUtil.destroy();
    };
    TimelineDirective.prototype.ngOnChanges = function (changes) {
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
        if (changes['filterEnabled']) {
            this.chartWrapper.chart.filter(this.filterEnabled);
            redraw = redraw || !changes['filterEnabled'].isFirstChange();
        }
        if (changes['filterState'] && !changes['filterState'].isFirstChange()) {
            // Only apply it if it actually changed
            if (this.didFilterChange(changes['filterState'].currentValue, changes['filterState'].previousValue)) {
                this.chartWrapper.chart.setFilter(this.filterState);
                redraw = true;
            }
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
    ], TimelineDirective.prototype, "model", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TimelineDirective.prototype, "markers", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TimelineDirective.prototype, "yExtent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TimelineDirective.prototype, "xExtent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TimelineDirective.prototype, "resizeWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TimelineDirective.prototype, "resizeHeight", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TimelineDirective.prototype, "chartReady", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TimelineDirective.prototype, "filterEnabled", void 0);
    __decorate([
        core_1.Input('filter'), 
        __metadata('design:type', Object)
    ], TimelineDirective.prototype, "filterState", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TimelineDirective.prototype, "filterChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TimelineDirective.prototype, "markerOver", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TimelineDirective.prototype, "markerOut", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TimelineDirective.prototype, "markerClick", void 0);
    __decorate([
        core_1.HostListener('window:resize', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], TimelineDirective.prototype, "onResize", null);
    TimelineDirective = __decorate([
        core_1.Directive({
            selector: 'sentioTimeline'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], TimelineDirective);
    return TimelineDirective;
}());
exports.TimelineDirective = TimelineDirective;

//# sourceMappingURL=timeline.directive.js.map
