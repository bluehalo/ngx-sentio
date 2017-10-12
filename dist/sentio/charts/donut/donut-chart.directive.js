import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { chartDonut } from '@asymmetrik/sentio';
import { ChartWrapper } from '../../util/chart-wrapper.util';
import { ResizeUtil } from '../../util/resize.util';
var DonutChartDirective = /** @class */ (function () {
    function DonutChartDirective(el) {
        // Chart Ready event
        this.chartReady = new EventEmitter();
        // Create the chart
        this.chartWrapper = new ChartWrapper(el, chartDonut(), this.chartReady);
        // Set up the resizer
        this.resizeUtil = new ResizeUtil(el, this.resizeEnabled);
    }
    /**
     * For the donut chart, we pin the height to the width
     * to keep the aspect ratio correct
     */
    DonutChartDirective.prototype.setChartDimensions = function (dim, force) {
        if (force === void 0) { force = false; }
        if ((force || this.resizeEnabled) && null != dim.width && this.chartWrapper.chart.width() !== dim.width) {
            // pin the height to the width
            this.chartWrapper.chart
                .width(dim.width)
                .height(dim.width)
                .resize();
        }
    };
    DonutChartDirective.prototype.onResize = function (event) {
        this.resizeUtil.resizeObserver.next(event);
    };
    DonutChartDirective.prototype.ngOnInit = function () {
        var _this = this;
        // Initialize the chart
        this.chartWrapper.initialize();
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
    DonutChartDirective.prototype.ngOnDestroy = function () {
        this.resizeUtil.destroy();
    };
    DonutChartDirective.prototype.ngOnChanges = function (changes) {
        var resize = false;
        var redraw = false;
        if (changes['sentioData']) {
            this.chartWrapper.chart.data(this.data);
            redraw = redraw || !changes['sentioData'].isFirstChange();
        }
        if (changes['sentioDuration']) {
            this.chartWrapper.chart.duration(this.duration);
        }
        if (changes['sentioColorScale']) {
            this.chartWrapper.chart.colorScale(this.colorScale);
            redraw = redraw || !changes['sentioColorScale'].isFirstChange();
        }
        if (changes['sentioResize']) {
            this.resizeUtil.enabled = this.resizeEnabled;
            resize = resize || (this.resizeEnabled && !changes['sentioResize'].isFirstChange());
            redraw = redraw || resize;
        }
        // Only redraw once if necessary
        if (resize) {
            this.chartWrapper.chart.resize();
        }
        if (redraw) {
            this.chartWrapper.chart.redraw();
        }
    };
    DonutChartDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'sentioDonutChart'
                },] },
    ];
    /** @nocollapse */
    DonutChartDirective.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    DonutChartDirective.propDecorators = {
        'data': [{ type: Input, args: ['sentioData',] },],
        'colorScale': [{ type: Input, args: ['sentioColorScale',] },],
        'resizeEnabled': [{ type: Input, args: ['sentioResize',] },],
        'duration': [{ type: Input, args: ['sentioDuration',] },],
        'chartReady': [{ type: Output, args: ['sentioChartReady',] },],
        'onResize': [{ type: HostListener, args: ['window:resize', ['$event'],] },],
    };
    return DonutChartDirective;
}());
export { DonutChartDirective };
//# sourceMappingURL=donut-chart.directive.js.map