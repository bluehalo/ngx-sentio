"use strict";
var core_1 = require('@angular/core');
var sentio = require('@asymmetrik/sentio');
var chart_wrapper_util_1 = require('../util/chart-wrapper.util');
var MatrixChartDirective = (function () {
    function MatrixChartDirective(el) {
        // Chart Ready event
        this.chartReady = new core_1.EventEmitter();
        // Create the chart
        this.chartWrapper = new chart_wrapper_util_1.ChartWrapper(el, sentio.chart.matrix(), this.chartReady);
    }
    MatrixChartDirective.prototype.ngOnInit = function () {
        // Initialize the chart
        this.chartWrapper.initialize();
        this.chartWrapper.chart.redraw();
    };
    MatrixChartDirective.prototype.ngOnDestroy = function () {
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
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], MatrixChartDirective.prototype, "model", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], MatrixChartDirective.prototype, "duration", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MatrixChartDirective.prototype, "chartReady", void 0);
    MatrixChartDirective = __decorate([
        core_1.Directive({
            selector: 'sentioMatrixChart'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], MatrixChartDirective);
    return MatrixChartDirective;
}());
exports.MatrixChartDirective = MatrixChartDirective;

//# sourceMappingURL=matrix-chart.directive.js.map
