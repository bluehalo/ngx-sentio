import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { chartTimeline } from '@asymmetrik/sentio';
import { ChartWrapper } from '../../util/chart-wrapper.util';
import { ResizeUtil } from '../../util/resize.util';
import { TimelineUtil } from './timeline.util';
var TimelineDirective = /** @class */ (function () {
    function TimelineDirective(el) {
        // Chart Ready event
        this.chartReady = new EventEmitter();
        // Interaction events
        this.brush = new EventEmitter();
        this.pointMouseover = new EventEmitter();
        this.pointMouseout = new EventEmitter();
        this.pointClick = new EventEmitter();
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
        // register for the point events
        this.chartWrapper.chart.dispatch()
            .on('pointClick.internal', function (d) { return _this.pointClick.emit(d); })
            .on('pointMouseover.internal', function (d) { return _this.pointMouseover.emit(d); })
            .on('pointMouseout.internal', function (d) { return _this.pointMouseout.emit(d); });
        // register for the marker events
        this.chartWrapper.chart.dispatch()
            .on('markerClick.internal', function (d) { return _this.markerClick.emit(d); })
            .on('markerMouseover.internal', function (d) { return _this.markerMouseover.emit(d); })
            .on('markerMouseout.internal', function (d) { return _this.markerMouseout.emit(d); });
        // register for the brush end event
        this.chartWrapper.chart.dispatch()
            .on('brushEnd.internal', function (fs) {
            // If the brush actually changed, emit the event
            if (_this.timelineUtil.didBrushChange(fs, _this.brushState)) {
                setTimeout(function () { _this.brush.emit(fs); });
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
        var retVal = this.timelineUtil.onChanges(changes);
        // Only redraw once if necessary
        if (retVal.resize) {
            this.chartWrapper.chart.resize();
        }
        if (retVal.redraw) {
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
        { type: ElementRef }
    ]; };
    TimelineDirective.propDecorators = {
        data: [{ type: Input, args: ['sentioData',] }],
        series: [{ type: Input, args: ['sentioSeries',] }],
        markers: [{ type: Input, args: ['sentioMarkers',] }],
        yExtent: [{ type: Input, args: ['sentioYExtent',] }],
        xExtent: [{ type: Input, args: ['sentioXExtent',] }],
        showGrid: [{ type: Input, args: ['sentioShowGrid',] }],
        showXGrid: [{ type: Input, args: ['sentioShowXGrid',] }],
        showYGrid: [{ type: Input, args: ['sentioShowYGrid',] }],
        pointEvents: [{ type: Input, args: ['sentioPointEvents',] }],
        resizeWidth: [{ type: Input, args: ['sentioResizeWidth',] }],
        resizeHeight: [{ type: Input, args: ['sentioResizeHeight',] }],
        chartReady: [{ type: Output, args: ['sentioChartReady',] }],
        brushEnabled: [{ type: Input, args: ['sentioBrushEnabled',] }],
        brushState: [{ type: Input, args: ['sentioBrush',] }],
        brush: [{ type: Output, args: ['sentioBrushChange',] }],
        pointMouseover: [{ type: Output, args: ['sentioPointMouseover',] }],
        pointMouseout: [{ type: Output, args: ['sentioPointMouseout',] }],
        pointClick: [{ type: Output, args: ['sentioPointClick',] }],
        markerMouseover: [{ type: Output, args: ['sentioMarkerMouseover',] }],
        markerMouseout: [{ type: Output, args: ['sentioMarkerMouseout',] }],
        markerClick: [{ type: Output, args: ['sentioMarkerClick',] }],
        onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
    };
    return TimelineDirective;
}());
export { TimelineDirective };
//# sourceMappingURL=timeline.directive.js.map