"use strict";
var core_1 = require('@angular/core');
var sentio = require('@asymmetrik/sentio');
var base_chart_directive_1 = require('./base-chart.directive');
var VerticalBarChartDirective = (function (_super) {
    __extends(VerticalBarChartDirective, _super);
    function VerticalBarChartDirective(el) {
        _super.call(this, el, sentio.chart.verticalBars());
    }
    /**
     * For The vertical bar chart, we just resize width
     */
    VerticalBarChartDirective.prototype.setChartDimensions = function (width, height, force) {
        if (force === void 0) { force = false; }
        if ((force || this.resizeChart) && null != this.chart.width) {
            if (null != width && this.chart.width() !== width) {
                this.chart.width(width).resize().redraw();
            }
        }
    };
    VerticalBarChartDirective.prototype.onResize = function (event) {
        if (this.resizeChart) {
            this.delayResize();
        }
    };
    VerticalBarChartDirective.prototype.ngOnInit = function () {
        if (this.resizeChart) {
            this.resize();
        }
    };
    VerticalBarChartDirective.prototype.ngOnChanges = function (changes) {
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
        if (changes['widthExtent']) {
            this.chart.widthExtent().overrideValue(changes['widthExtent'].currentValue);
            redraw = true;
        }
        if (redraw) {
            this.chart.redraw();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], VerticalBarChartDirective.prototype, "model", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], VerticalBarChartDirective.prototype, "widthExtent", void 0);
    __decorate([
        core_1.Input('resize'), 
        __metadata('design:type', Boolean)
    ], VerticalBarChartDirective.prototype, "resizeChart", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], VerticalBarChartDirective.prototype, "duration", void 0);
    __decorate([
        core_1.Input('configure'), 
        __metadata('design:type', Function)
    ], VerticalBarChartDirective.prototype, "configureFn", void 0);
    __decorate([
        core_1.HostListener('window:resize', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], VerticalBarChartDirective.prototype, "onResize", null);
    VerticalBarChartDirective = __decorate([
        core_1.Directive({
            selector: 'vertical-bar-chart'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], VerticalBarChartDirective);
    return VerticalBarChartDirective;
}(base_chart_directive_1.BaseChartDirective));
exports.VerticalBarChartDirective = VerticalBarChartDirective;
;

//# sourceMappingURL=vertical-bar-chart.directive.js.map
