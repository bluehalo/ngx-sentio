import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { chartTimeline } from '@asymmetrik/sentio';
import { ChartWrapper } from '../../util/chart-wrapper.util';
import { ResizeUtil } from '../../util/resize.util';
import { TimelineUtil } from './timeline.util';
var TimelineDirective = /** @class */ (function () {
    function TimelineDirective(el) {
        // Chart Ready event
        this.chartReady = new EventEmitter();
        this.brushChange = new EventEmitter();
        // Interaction events
        this.markerMouseover = new EventEmitter();
        this.markerMouseout = new EventEmitter();
        this.markerClick = new EventEmitter();
        // Create the chart
        this.chartWrapper = new ChartWrapper(el, chartTimeline(), this.chartReady);
        // Set up the resizer
        this.resizeUtil = new ResizeUtil(el, (this.resizeHeight || this.resizeWidth));
        this.timelineUtil = new TimelineUtil(this.chartWrapper);
    }
    TimelineDirective.prototype.onResize = function (event) {
        this.resizeUtil.resizeObserver.next(event);
    };
    TimelineDirective.prototype.ngOnInit = function () {
        var _this = this;
        // Initialize the chart
        this.chartWrapper.initialize();
        // register for the marker events
        this.chartWrapper.chart.dispatch()
            .on('markerClick', this.markerClick.emit)
            .on('markerMouseover', this.markerMouseover.emit)
            .on('markerMouseout', this.markerMouseout.emit);
        // register for the brush end event
        this.chartWrapper.chart.dispatch()
            .on('brushEnd', function (fs) {
            // If the brush actually changed, emit the event
            if (_this.timelineUtil.didBrushChange(fs, _this.brushState)) {
                setTimeout(function () { _this.brushChange.emit(fs); });
            }
        });
        // Set up the resize callback
        this.resizeUtil.resizeSource
            .subscribe(function () {
            // Do the resize operation
            _this.timelineUtil.setChartDimensions(_this.resizeUtil.getSize(), _this.resizeWidth, _this.resizeHeight);
            _this.chartWrapper.chart.redraw();
        });
        // Set the initial size of the chart
        this.timelineUtil.setChartDimensions(this.resizeUtil.getSize(), this.resizeWidth, this.resizeHeight, true);
        this.chartWrapper.chart.redraw();
        // Set the brush (if it exists)
        if (null != this.brushState) {
            this.chartWrapper.chart.setBrush(this.brushState);
        }
    };
    TimelineDirective.prototype.ngOnDestroy = function () {
        this.resizeUtil.destroy();
    };
    TimelineDirective.prototype.ngOnChanges = function (changes) {
        var resize = false;
        var redraw = false;
        if (changes['sentioData']) {
            this.chartWrapper.chart.data(this.data);
            redraw = redraw || !changes['sentioData'].isFirstChange();
        }
        if (changes['sentioSeries']) {
            this.chartWrapper.chart.series(this.series);
            redraw = redraw || !changes['sentioSeries'].isFirstChange();
        }
        if (changes['sentioMarkers']) {
            this.chartWrapper.chart.markers(this.markers);
            redraw = redraw || !changes['sentioMarkers'].isFirstChange();
        }
        if (changes['sentioYExtent']) {
            this.chartWrapper.chart.yExtent().overrideValue(this.yExtent);
            redraw = redraw || !changes['sentioYExtent'].isFirstChange();
        }
        if (changes['sentioXExtent']) {
            this.chartWrapper.chart.xExtent().overrideValue(this.xExtent);
            redraw = redraw || !changes['sentioXExtent'].isFirstChange();
        }
        if (changes['sentioBrushEnabled']) {
            this.chartWrapper.chart.brush(this.brushEnabled);
            redraw = redraw || !changes['sentioBrushEnabled'].isFirstChange();
        }
        if (changes['sentioBrush'] && !changes['sentioBrush'].isFirstChange()) {
            // Only apply it if it actually changed
            if (this.timelineUtil.didBrushChange(changes['sentioBrush'].currentValue, changes['sentioBrush'].previousValue)) {
                this.chartWrapper.chart.setBrush(this.brushState);
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
    TimelineDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'sentioTimeline'
                },] },
    ];
    /** @nocollapse */
    TimelineDirective.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    TimelineDirective.propDecorators = {
        'data': [{ type: Input, args: ['sentioData',] },],
        'series': [{ type: Input, args: ['sentioSeries',] },],
        'markers': [{ type: Input, args: ['sentioMarkers',] },],
        'yExtent': [{ type: Input, args: ['sentioYExtent',] },],
        'xExtent': [{ type: Input, args: ['sentioXExtent',] },],
        'resizeWidth': [{ type: Input, args: ['sentioResizeWidth',] },],
        'resizeHeight': [{ type: Input, args: ['sentioResizeHeight',] },],
        'chartReady': [{ type: Output, args: ['sentioChartReady',] },],
        'brushEnabled': [{ type: Input, args: ['sentioBrushEnabled',] },],
        'brushState': [{ type: Input, args: ['sentioBrush',] },],
        'brushChange': [{ type: Output, args: ['sentioBrushChange',] },],
        'markerMouseover': [{ type: Output, args: ['sentioMarkerMouseover',] },],
        'markerMouseout': [{ type: Output, args: ['sentioMarkerMouseout',] },],
        'markerClick': [{ type: Output, args: ['sentioMarkerClick',] },],
        'onResize': [{ type: HostListener, args: ['window:resize', ['$event'],] },],
    };
    return TimelineDirective;
}());
export { TimelineDirective };
//# sourceMappingURL=timeline.directive.js.map