var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import * as sentio from '@asymmetrik/sentio';
import { ChartWrapper } from '../util/chart-wrapper.util';
import { ResizeUtil } from '../util/resize.util';
var TimelineDirective = (function () {
    function TimelineDirective(el) {
        // Chart Ready event
        this.chartReady = new EventEmitter();
        this.filterChange = new EventEmitter();
        // Interaction events
        this.markerOver = new EventEmitter();
        this.markerOut = new EventEmitter();
        this.markerClick = new EventEmitter();
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
        this.chartWrapper = new ChartWrapper(el, sentio.chart.timeline(), this.chartReady);
        // Set up the resizer
        this.resizeUtil = new ResizeUtil(el, (this.resizeHeight || this.resizeWidth));
    }
    /**
     * For the timeline, both dimensions scale independently
     */
    TimelineDirective.prototype.setChartDimensions = function (dim, force) {
        if (force === void 0) { force = false; }
        var resize = false;
        if ((force || this.resizeWidth) && null != dim.width && this.chartWrapper.chart.width() !== dim.width) {
            // pin the height to the width
            this.chartWrapper.chart
                .width(dim.width);
            resize = true;
        }
        if ((force || this.resizeHeight) && null != dim.height && this.chartWrapper.chart.height() !== dim.height) {
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
        this.setChartDimensions(this.resizeUtil.getSize(), true);
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
    return TimelineDirective;
}());
__decorate([
    Input(),
    __metadata("design:type", Array)
], TimelineDirective.prototype, "model", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], TimelineDirective.prototype, "markers", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], TimelineDirective.prototype, "yExtent", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], TimelineDirective.prototype, "xExtent", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], TimelineDirective.prototype, "resizeWidth", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], TimelineDirective.prototype, "resizeHeight", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TimelineDirective.prototype, "chartReady", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], TimelineDirective.prototype, "filterEnabled", void 0);
__decorate([
    Input('filter'),
    __metadata("design:type", Array)
], TimelineDirective.prototype, "filterState", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TimelineDirective.prototype, "filterChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], TimelineDirective.prototype, "markerOver", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], TimelineDirective.prototype, "markerOut", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], TimelineDirective.prototype, "markerClick", void 0);
__decorate([
    HostListener('window:resize', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TimelineDirective.prototype, "onResize", null);
TimelineDirective = __decorate([
    Directive({
        selector: 'sentioTimeline'
    }),
    __metadata("design:paramtypes", [ElementRef])
], TimelineDirective);
export { TimelineDirective };
//# sourceMappingURL=timeline.directive.js.map