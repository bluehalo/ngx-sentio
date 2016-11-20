var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '@asymmetrik/sentio', './base-chart.directive'], factory);
    }
})(function (require, exports) {
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
});

//# sourceMappingURL=vertical-bar-chart.directive.js.map
