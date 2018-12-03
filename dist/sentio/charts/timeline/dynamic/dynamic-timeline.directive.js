import { ContentChild, Directive, EventEmitter, Output } from '@angular/core';
import { AutoBrushTimelineDirective } from '../auto-brush/auto-brush-timeline.directive';
import { TimelineDirective } from '../timeline.directive';
var DynamicTimelineDirective = /** @class */ (function () {
    function DynamicTimelineDirective() {
        // Chart Ready event
        this.chartReady = new EventEmitter();
    }
    // Set the autoBrush timeline brush to the new value
    DynamicTimelineDirective.prototype.setBrush = function (newBrush) {
        this.autoBrush.setBrush(newBrush);
        this.autoBrush.redraw();
    };
    DynamicTimelineDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.timeline = this.timelineDirective.chartWrapper.chart;
        this.autoBrush = this.autoBrushDirective.chartWrapper.chart;
        // Default config
        this.timeline
            .margin({ top: 16, right: 8, bottom: 24, left: 32 })
            .showGrid(true)
            .pointEvents('values')
            .brush(false);
        this.timeline.yExtent().overrideValue([0, undefined]);
        this.timeline.xAxis().ticks(6);
        this.timeline.xGridAxis().ticks(6);
        this.autoBrush
            .margin({ top: 2, right: 8, bottom: 2, left: 32 });
        this.autoBrush.yExtent().overrideValue([0, undefined]);
        // Auto Brush events
        this.autoBrush.dispatch()
            .on('brushChange.internalDynamicTimeline', function (newBrush) {
            _this.setTimelineExtent(newBrush);
        });
        // Emit that the charts are ready
        this.chartReady.emit({ timeline: this.timeline, autoBrush: this.autoBrush });
    };
    // Set the timeline extent to the new value
    DynamicTimelineDirective.prototype.setTimelineExtent = function (newExtent) {
        this.timeline.xExtent().overrideValue(newExtent);
        this.timeline.redraw();
    };
    DynamicTimelineDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[sentioDynamicTimeline]'
                },] },
    ];
    DynamicTimelineDirective.propDecorators = {
        timelineDirective: [{ type: ContentChild, args: [TimelineDirective,] }],
        autoBrushDirective: [{ type: ContentChild, args: [AutoBrushTimelineDirective,] }],
        chartReady: [{ type: Output, args: ['sentioChartReady',] }]
    };
    return DynamicTimelineDirective;
}());
export { DynamicTimelineDirective };
//# sourceMappingURL=dynamic-timeline.directive.js.map