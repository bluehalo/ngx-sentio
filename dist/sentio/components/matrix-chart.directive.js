import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import * as sentio from '@asymmetrik/sentio';
import { ChartWrapper } from '../util/chart-wrapper.util';
var MatrixChartDirective = (function () {
    function MatrixChartDirective(el) {
        // Chart Ready event
        this.chartReady = new EventEmitter();
        // Create the chart
        this.chartWrapper = new ChartWrapper(el, sentio.chart.matrix(), this.chartReady);
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
        if (changes['model']) {
            this.chartWrapper.chart.data(this.model);
            redraw = redraw || !changes['model'].isFirstChange();
        }
        if (changes['duration']) {
            this.chartWrapper.chart.duration(this.duration);
        }
        // Only redraw once if possible
        if (redraw) {
            this.chartWrapper.chart.redraw();
        }
    };
    return MatrixChartDirective;
}());
export { MatrixChartDirective };
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
    'model': [{ type: Input },],
    'duration': [{ type: Input },],
    'chartReady': [{ type: Output },],
};
//# sourceMappingURL=matrix-chart.directive.js.map