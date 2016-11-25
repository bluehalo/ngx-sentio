"use strict";
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdmVydGljYWwtYmFyLWNoYXJ0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQkFBb0YsZUFBZSxDQUFDLENBQUE7QUFDcEcsSUFBWSxNQUFNLFdBQU0sb0JBQW9CLENBQUMsQ0FBQTtBQUU3QyxxQ0FBbUMsd0JBQXdCLENBQUMsQ0FBQTtBQU01RDtJQUNTLDZDQUFrQjtJQVcxQixtQ0FBWSxFQUFjO1FBQ3pCLGtCQUFNLEVBQUUsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsc0RBQWtCLEdBQWxCLFVBQW1CLEtBQWEsRUFBRSxNQUFjLEVBQUUsS0FBc0I7UUFBdEIscUJBQXNCLEdBQXRCLGFBQXNCO1FBQ3ZFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzdELEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNuRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMzQyxDQUFDO1FBQ0YsQ0FBQztJQUNGLENBQUM7SUFHRCw0Q0FBUSxHQUFSLFVBQVMsS0FBVTtRQUNsQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDcEIsQ0FBQztJQUNGLENBQUM7SUFFRCw0Q0FBUSxHQUFSO1FBQ0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2YsQ0FBQztJQUNGLENBQUM7SUFFRCwrQ0FBVyxHQUFYLFVBQVksT0FBd0M7UUFDbkQsSUFBSSxNQUFNLEdBQVksS0FBSyxDQUFDO1FBRTVCLDhCQUE4QjtRQUM5QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLGFBQWEsRUFBRTtlQUMvRCxJQUFJLElBQUksT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDbEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUIsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQy9DLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDZixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDNUUsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNmLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNyQixDQUFDO0lBQ0YsQ0FBQztJQTFERDtRQUFDLFlBQUssRUFBRTs7NERBQUE7SUFDUjtRQUFDLFlBQUssRUFBRTs7a0VBQUE7SUFFUjtRQUFDLFlBQUssQ0FBQyxRQUFRLENBQUM7O2tFQUFBO0lBQ2hCO1FBQUMsWUFBSyxFQUFFOzsrREFBQTtJQUVSO1FBQUMsWUFBSyxDQUFDLFdBQVcsQ0FBQzs7a0VBQUE7SUFpQm5CO1FBQUMsbUJBQVksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozs2REFBQTtJQTlCM0M7UUFBQyxnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLG9CQUFvQjtTQUM5QixDQUFDOztpQ0FBQTtJQWlFRixnQ0FBQztBQUFELENBaEVBLEFBZ0VDLENBL0RRLHlDQUFrQixHQStEMUI7QUFoRVksaUNBQXlCLDRCQWdFckMsQ0FBQTtBQUFBLENBQUMiLCJmaWxlIjoiY29tcG9uZW50cy92ZXJ0aWNhbC1iYXItY2hhcnQuZGlyZWN0aXZlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgc2VudGlvIGZyb20gJ0Bhc3ltbWV0cmlrL3NlbnRpbyc7XG5cbmltcG9ydCB7IEJhc2VDaGFydERpcmVjdGl2ZSB9IGZyb20gJy4vYmFzZS1jaGFydC5kaXJlY3RpdmUnO1xuXG5cbkBEaXJlY3RpdmUoe1xuXHRzZWxlY3RvcjogJ3ZlcnRpY2FsLWJhci1jaGFydCdcbn0pXG5leHBvcnQgY2xhc3MgVmVydGljYWxCYXJDaGFydERpcmVjdGl2ZVxuXHRleHRlbmRzIEJhc2VDaGFydERpcmVjdGl2ZVxuXHRpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cblx0QElucHV0KCkgbW9kZWw6IE9iamVjdFtdO1xuXHRASW5wdXQoKSB3aWR0aEV4dGVudDogT2JqZWN0W107XG5cblx0QElucHV0KCdyZXNpemUnKSByZXNpemVDaGFydDogYm9vbGVhbjtcblx0QElucHV0KCkgZHVyYXRpb246IG51bWJlcjtcblxuXHRASW5wdXQoJ2NvbmZpZ3VyZScpIGNvbmZpZ3VyZUZuOiAoY2hhcnQ6IGFueSkgPT4gdm9pZDtcblxuXHRjb25zdHJ1Y3RvcihlbDogRWxlbWVudFJlZikge1xuXHRcdHN1cGVyKGVsLCBzZW50aW8uY2hhcnQudmVydGljYWxCYXJzKCkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEZvciBUaGUgdmVydGljYWwgYmFyIGNoYXJ0LCB3ZSBqdXN0IHJlc2l6ZSB3aWR0aFxuXHQgKi9cblx0c2V0Q2hhcnREaW1lbnNpb25zKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBmb3JjZTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG5cdFx0aWYgKChmb3JjZSB8fCB0aGlzLnJlc2l6ZUNoYXJ0KSAmJiBudWxsICE9IHRoaXMuY2hhcnQud2lkdGgpIHtcblx0XHRcdGlmIChudWxsICE9IHdpZHRoICYmIHRoaXMuY2hhcnQud2lkdGgoKSAhPT0gd2lkdGgpIHtcblx0XHRcdFx0dGhpcy5jaGFydC53aWR0aCh3aWR0aCkucmVzaXplKCkucmVkcmF3KCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0QEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXG5cdG9uUmVzaXplKGV2ZW50OiBhbnkpIHtcblx0XHRpZiAodGhpcy5yZXNpemVDaGFydCkge1xuXHRcdFx0dGhpcy5kZWxheVJlc2l6ZSgpO1xuXHRcdH1cblx0fVxuXG5cdG5nT25Jbml0KCkge1xuXHRcdGlmICh0aGlzLnJlc2l6ZUNoYXJ0KSB7XG5cdFx0XHR0aGlzLnJlc2l6ZSgpO1xuXHRcdH1cblx0fVxuXG5cdG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW2tleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pIHtcblx0XHRsZXQgcmVkcmF3OiBib29sZWFuID0gZmFsc2U7XG5cblx0XHQvLyBDYWxsIHRoZSBjb25maWd1cmUgZnVuY3Rpb25cblx0XHRpZiAoY2hhbmdlc1snY29uZmlndXJlRm4nXSAmJiBjaGFuZ2VzWydjb25maWd1cmVGbiddLmlzRmlyc3RDaGFuZ2UoKVxuXHRcdFx0XHQmJiBudWxsICE9IGNoYW5nZXNbJ2NvbmZpZ3VyZUZuJ10uY3VycmVudFZhbHVlKSB7XG5cdFx0XHR0aGlzLmNvbmZpZ3VyZUZuKHRoaXMuY2hhcnQpO1xuXHRcdH1cblxuXHRcdGlmIChjaGFuZ2VzWydtb2RlbCddKSB7XG5cdFx0XHR0aGlzLmNoYXJ0LmRhdGEoY2hhbmdlc1snbW9kZWwnXS5jdXJyZW50VmFsdWUpO1xuXHRcdFx0cmVkcmF3ID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRpZiAoY2hhbmdlc1snd2lkdGhFeHRlbnQnXSkge1xuXHRcdFx0dGhpcy5jaGFydC53aWR0aEV4dGVudCgpLm92ZXJyaWRlVmFsdWUoY2hhbmdlc1snd2lkdGhFeHRlbnQnXS5jdXJyZW50VmFsdWUpO1xuXHRcdFx0cmVkcmF3ID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRpZiAocmVkcmF3KSB7XG5cdFx0XHR0aGlzLmNoYXJ0LnJlZHJhdygpO1xuXHRcdH1cblx0fVxuXG59O1xuIl19
