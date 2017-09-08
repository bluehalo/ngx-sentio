import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import * as sentio from '@asymmetrik/sentio';
import { ChartWrapper } from '../../util/chart-wrapper.util';
import { ResizeUtil } from '../../util/resize.util';
import { TimelineUtil } from './timeline.util';
var TimelineDirective = /** @class */ (function () {
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
            _this.timelineUtil.setChartDimensions(_this.resizeUtil.getSize(), _this.resizeWidth, _this.resizeHeight);
            _this.chartWrapper.chart.redraw();
        });
        // Set the initial size of the chart
        this.timelineUtil.setChartDimensions(this.resizeUtil.getSize(), this.resizeWidth, this.resizeHeight, true);
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
        'model': [{ type: Input },],
        'markers': [{ type: Input },],
        'yExtent': [{ type: Input },],
        'xExtent': [{ type: Input },],
        'resizeWidth': [{ type: Input },],
        'resizeHeight': [{ type: Input },],
        'chartReady': [{ type: Output },],
        'filterEnabled': [{ type: Input },],
        'filterState': [{ type: Input, args: ['filter',] },],
        'filterChange': [{ type: Output },],
        'markerOver': [{ type: Output },],
        'markerOut': [{ type: Output },],
        'markerClick': [{ type: Output },],
        'onResize': [{ type: HostListener, args: ['window:resize', ['$event'],] },],
    };
    return TimelineDirective;
}());
export { TimelineDirective };
//# sourceMappingURL=timeline.directive.js.map