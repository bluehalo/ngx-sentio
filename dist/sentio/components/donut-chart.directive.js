"use strict";
var core_1 = require('@angular/core');
var sentio = require('@asymmetrik/sentio');
var base_chart_directive_1 = require('./base-chart.directive');
var DonutChartDirective = (function (_super) {
    __extends(DonutChartDirective, _super);
    function DonutChartDirective(el) {
        _super.call(this, el, sentio.chart.donut());
    }
    /**
     * For the donut chart, we pin the height to the width
     * to keep the aspect ratio correct
     */
    DonutChartDirective.prototype.setChartDimensions = function (width, height, force) {
        if (force === void 0) { force = false; }
        if ((force || this.resizeChart) && null != this.chart.width) {
            if (null != width && this.chart.width() !== width) {
                // pin the height to the width
                this.chart
                    .width(width)
                    .height(width)
                    .resize().redraw();
            }
        }
    };
    DonutChartDirective.prototype.onResize = function (event) {
        if (this.resizeChart) {
            this.delayResize();
        }
    };
    DonutChartDirective.prototype.ngOnInit = function () {
        if (this.resizeChart) {
            this.resize();
        }
    };
    DonutChartDirective.prototype.ngOnChanges = function (changes) {
        var redraw = false;
        // Call the configure function
        if (changes['configureFn'] && changes['configureFn'].isFirstChange()
            && null != changes['configureFn'].currentValue) {
            this.configureFn(this.chart);
        }
        if (changes['model']) {
            this.chart.data(changes['model'].currentValue);
            redraw = true;
        }
        if (changes['duration']) {
            this.chart.duration(changes['duration'].currentValue);
        }
        if (changes['colorScale']) {
            this.chart.color(changes['colorScale'].currentValue);
            redraw = true;
        }
        // Only redraw once if possible
        if (redraw) {
            this.chart.redraw();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DonutChartDirective.prototype, "model", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DonutChartDirective.prototype, "colorScale", void 0);
    __decorate([
        core_1.Input('resize'), 
        __metadata('design:type', Boolean)
    ], DonutChartDirective.prototype, "resizeChart", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DonutChartDirective.prototype, "duration", void 0);
    __decorate([
        core_1.Input('configure'), 
        __metadata('design:type', Function)
    ], DonutChartDirective.prototype, "configureFn", void 0);
    __decorate([
        core_1.HostListener('window:resize', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DonutChartDirective.prototype, "onResize", null);
    DonutChartDirective = __decorate([
        core_1.Directive({
            selector: 'donut-chart'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], DonutChartDirective);
    return DonutChartDirective;
}(base_chart_directive_1.BaseChartDirective));
exports.DonutChartDirective = DonutChartDirective;

//# sourceMappingURL=donut-chart.directive.js.map
