import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { chartMatrix } from '@asymmetrik/sentio';
import { ChartWrapper } from '../../util/chart-wrapper.util';
var MatrixChartDirective = /** @class */ (function () {
    function MatrixChartDirective(el) {
        // Chart Ready event
        this.chartReady = new EventEmitter();
        // Create the chart
        this.chartWrapper = new ChartWrapper(el, chartMatrix(), this.chartReady);
    }
    MatrixChartDirective.prototype.ngOnInit = function () {
        // Initialize the chart
        this.chartWrapper.initialize();
        this.chartWrapper.chart.redraw();
    };
    MatrixChartDirective.prototype.ngOnDestroy = function () {
        // Nothing for now
    };
    MatrixChartDirective.prototype.ngOnChanges = function (changes) {
        var redraw = false;
        if (changes['data']) {
            this.chartWrapper.chart.data(this.data);
            redraw = redraw || !changes['data'].isFirstChange();
        }
        if (changes['series']) {
            this.chartWrapper.chart.series(this.series);
            redraw = redraw || !changes['series'].isFirstChange();
        }
        if (changes['duration']) {
            this.chartWrapper.chart.duration(this.duration);
        }
        // Only redraw once if possible
        if (redraw) {
            this.chartWrapper.chart.redraw();
        }
    };
    MatrixChartDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'sentioMatrixChart'
                },] },
    ];
    /** @nocollapse */
    MatrixChartDirective.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    MatrixChartDirective.propDecorators = {
        'data': [{ type: Input, args: ['sentioData',] },],
        'series': [{ type: Input, args: ['sentioSeries',] },],
        'duration': [{ type: Input, args: ['sentioDuration',] },],
        'chartReady': [{ type: Output, args: ['sentioChartReady',] },],
    };
    return MatrixChartDirective;
}());
export { MatrixChartDirective };
//# sourceMappingURL=matrix-chart.directive.js.map