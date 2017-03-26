import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import * as sentio from '@asymmetrik/sentio';
import { ChartWrapper } from '../util/chart-wrapper.util';
import { ResizeUtil } from '../util/resize.util';
var RealtimeTimelineDirective = (function () {
    function RealtimeTimelineDirective(el) {
        // Chart Ready event
        this.chartReady = new EventEmitter();
        // Interaction events
        this.markerOver = new EventEmitter();
        this.markerOut = new EventEmitter();
        this.markerClick = new EventEmitter();
        // Create the chart
        this.chartWrapper = new ChartWrapper(el, sentio.chart.realtimeTimeline(), this.chartReady);
        // Set up the resizer
        this.resizeUtil = new ResizeUtil(el, (this.resizeHeight || this.resizeWidth));
    }
    /**
     * For the timeline, both dimensions scale independently
     */
    RealtimeTimelineDirective.prototype.setChartDimensions = function (dim, force) {
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
        this.setChartDimensions(this.resizeUtil.getSize(), true);
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
    return RealtimeTimelineDirective;
}());
export { RealtimeTimelineDirective };
RealtimeTimelineDirective.decorators = [
    { type: Directive, args: [{
                selector: 'sentioRealtimeTimeline'
            },] },
];
/** @nocollapse */
RealtimeTimelineDirective.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
RealtimeTimelineDirective.propDecorators = {
    'model': [{ type: Input },],
    'markers': [{ type: Input },],
    'yExtent': [{ type: Input },],
    'xExtent': [{ type: Input },],
    'delay': [{ type: Input },],
    'fps': [{ type: Input },],
    'interval': [{ type: Input },],
    'resizeWidth': [{ type: Input },],
    'resizeHeight': [{ type: Input },],
    'chartReady': [{ type: Output },],
    'markerOver': [{ type: Output },],
    'markerOut': [{ type: Output },],
    'markerClick': [{ type: Output },],
    'onResize': [{ type: HostListener, args: ['window:resize', ['$event'],] },],
};
//# sourceMappingURL=realtime-timeline.directive.js.map