var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
__decorate([
    Input(),
    __metadata("design:type", Array)
], MatrixChartDirective.prototype, "model", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], MatrixChartDirective.prototype, "duration", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], MatrixChartDirective.prototype, "chartReady", void 0);
MatrixChartDirective = __decorate([
    Directive({
        selector: 'sentioMatrixChart'
    }),
    __metadata("design:paramtypes", [ElementRef])
], MatrixChartDirective);
export { MatrixChartDirective };

//# sourceMappingURL=matrix-chart.directive.js.map
