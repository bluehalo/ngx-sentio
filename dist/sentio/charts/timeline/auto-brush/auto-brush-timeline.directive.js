import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { chartAutoBrushTimeline } from '@asymmetrik/sentio';
import { ChartWrapper } from '../../../util/chart-wrapper.util';
import { ResizeUtil } from '../../../util/resize.util';
import { TimelineUtil } from '../timeline.util';
var AutoBrushTimelineDirective = /** @class */ (function () {
    function AutoBrushTimelineDirective(el) {
        // Chart Ready event
        this.chartReady = new EventEmitter();
        this.brushChange = new EventEmitter();
        // Extent State
        this.extentChange = new EventEmitter();
        // Create the chart
        this.chartWrapper = new ChartWrapper(el, chartAutoBrushTimeline(), this.chartReady);
        // Set up the resizer
        this.resizeUtil = new ResizeUtil(el, (this.resizeHeight || this.resizeWidth));
        this.timelineUtil = new TimelineUtil(this.chartWrapper);
    }
    AutoBrushTimelineDirective.prototype.onResize = function (event) {
        this.resizeUtil.resizeObserver.next(event);
    };
    AutoBrushTimelineDirective.prototype.ngOnInit = function () {
        var _this = this;
        // Initialize the chart
        this.chartWrapper.initialize();
        // register for the auto-brush events
        this.chartWrapper.chart.dispatch()
            .on('brushChange.internal', function (brush) {
            if (_this.timelineUtil.didBrushChange(brush, _this.brushState)) {
                setTimeout(function () { _this.brushChange.emit(brush); });
            }
        })
            .on('extentChange.internal', function (extent) { return _this.extentChange.emit(extent); });
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
    AutoBrushTimelineDirective.prototype.ngOnDestroy = function () {
        this.resizeUtil.destroy();
    };
    AutoBrushTimelineDirective.prototype.ngOnChanges = function (changes) {
        var retVal = this.timelineUtil.onChanges(changes);
        // Only redraw once if necessary
        if (retVal.resize) {
            this.chartWrapper.chart.resize();
        }
        if (retVal.redraw) {
            this.chartWrapper.chart.redraw();
        }
    };
    AutoBrushTimelineDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'sentioAutoBrushTimeline'
                },] },
    ];
    /** @nocollapse */
    AutoBrushTimelineDirective.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    AutoBrushTimelineDirective.propDecorators = {
        'data': [{ type: Input, args: ['sentioData',] },],
        'series': [{ type: Input, args: ['sentioSeries',] },],
        'yExtent': [{ type: Input, args: ['sentioYExtent',] },],
        'resizeWidth': [{ type: Input, args: ['sentioResizeWidth',] },],
        'resizeHeight': [{ type: Input, args: ['sentioResizeHeight',] },],
        'edgeTrigger': [{ type: Input, args: ['sentioEdgeTrigger',] },],
        'zoomInTrigger': [{ type: Input, args: ['sentioZoomInTrigger',] },],
        'zoomOutTrigger': [{ type: Input, args: ['sentioZoomOutTrigger',] },],
        'zoomTarget': [{ type: Input, args: ['sentiozoomTarget',] },],
        'maxExtent': [{ type: Input, args: ['sentioMaxExtent',] },],
        'minExtent': [{ type: Input, args: ['sentioMinExtent',] },],
        'minBrush': [{ type: Input, args: ['sentioMinBrush',] },],
        'chartReady': [{ type: Output, args: ['sentioChartReady',] },],
        'brushState': [{ type: Input, args: ['sentioBrush',] },],
        'brushChange': [{ type: Output, args: ['sentioBrushChange',] },],
        'extentChange': [{ type: Output, args: ['sentioExtentChange',] },],
        'onResize': [{ type: HostListener, args: ['window:resize', ['$event'],] },],
    };
    return AutoBrushTimelineDirective;
}());
export { AutoBrushTimelineDirective };
//# sourceMappingURL=auto-brush-timeline.directive.js.map