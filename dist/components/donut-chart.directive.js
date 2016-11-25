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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZG9udXQtY2hhcnQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFCQUFvRixlQUFlLENBQUMsQ0FBQTtBQUNwRyxJQUFZLE1BQU0sV0FBTSxvQkFBb0IsQ0FBQyxDQUFBO0FBRTdDLHFDQUFtQyx3QkFBd0IsQ0FBQyxDQUFBO0FBTTVEO0lBQ1MsdUNBQWtCO0lBVzFCLDZCQUFZLEVBQWM7UUFDekIsa0JBQU0sRUFBRSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsZ0RBQWtCLEdBQWxCLFVBQW1CLEtBQWEsRUFBRSxNQUFjLEVBQUUsS0FBc0I7UUFBdEIscUJBQXNCLEdBQXRCLGFBQXNCO1FBQ3ZFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzdELEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNuRCw4QkFBOEI7Z0JBQzlCLElBQUksQ0FBQyxLQUFLO3FCQUNSLEtBQUssQ0FBQyxLQUFLLENBQUM7cUJBQ1osTUFBTSxDQUFDLEtBQUssQ0FBQztxQkFDYixNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNyQixDQUFDO1FBQ0YsQ0FBQztJQUNGLENBQUM7SUFHRCxzQ0FBUSxHQUFSLFVBQVMsS0FBVTtRQUNsQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDcEIsQ0FBQztJQUNGLENBQUM7SUFFRCxzQ0FBUSxHQUFSO1FBQ0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2YsQ0FBQztJQUNGLENBQUM7SUFFRCx5Q0FBVyxHQUFYLFVBQVksT0FBd0M7UUFDbkQsSUFBSSxNQUFNLEdBQVksS0FBSyxDQUFDO1FBRTVCLDhCQUE4QjtRQUM5QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLGFBQWEsRUFBRTtlQUMvRCxJQUFJLElBQUksT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDbEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUIsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQy9DLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDZixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdkQsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3JELE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDZixDQUFDO1FBRUQsK0JBQStCO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDWixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3JCLENBQUM7SUFDRixDQUFDO0lBbEVEO1FBQUMsWUFBSyxFQUFFOztzREFBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzsyREFBQTtJQUVSO1FBQUMsWUFBSyxDQUFDLFFBQVEsQ0FBQzs7NERBQUE7SUFDaEI7UUFBQyxZQUFLLEVBQUU7O3lEQUFBO0lBRVI7UUFBQyxZQUFLLENBQUMsV0FBVyxDQUFDOzs0REFBQTtJQXNCbkI7UUFBQyxtQkFBWSxDQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7O3VEQUFBO0lBbkMzQztRQUFDLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsYUFBYTtTQUN2QixDQUFDOzsyQkFBQTtJQXlFRiwwQkFBQztBQUFELENBeEVBLEFBd0VDLENBdkVRLHlDQUFrQixHQXVFMUI7QUF4RVksMkJBQW1CLHNCQXdFL0IsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL2RvbnV0LWNoYXJ0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2UgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIHNlbnRpbyBmcm9tICdAYXN5bW1ldHJpay9zZW50aW8nO1xuXG5pbXBvcnQgeyBCYXNlQ2hhcnREaXJlY3RpdmUgfSBmcm9tICcuL2Jhc2UtY2hhcnQuZGlyZWN0aXZlJztcblxuXG5ARGlyZWN0aXZlKHtcblx0c2VsZWN0b3I6ICdkb251dC1jaGFydCdcbn0pXG5leHBvcnQgY2xhc3MgRG9udXRDaGFydERpcmVjdGl2ZVxuXHRleHRlbmRzIEJhc2VDaGFydERpcmVjdGl2ZVxuXHRpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cblx0QElucHV0KCkgbW9kZWw6IE9iamVjdFtdO1xuXHRASW5wdXQoKSBjb2xvclNjYWxlOiBhbnk7XG5cblx0QElucHV0KCdyZXNpemUnKSByZXNpemVDaGFydDogYm9vbGVhbjtcblx0QElucHV0KCkgZHVyYXRpb246IG51bWJlcjtcblxuXHRASW5wdXQoJ2NvbmZpZ3VyZScpIGNvbmZpZ3VyZUZuOiAoY2hhcnQ6IGFueSkgPT4gdm9pZDtcblxuXHRjb25zdHJ1Y3RvcihlbDogRWxlbWVudFJlZikge1xuXHRcdHN1cGVyKGVsLCBzZW50aW8uY2hhcnQuZG9udXQoKSk7XG5cdH1cblxuXHQvKipcblx0ICogRm9yIHRoZSBkb251dCBjaGFydCwgd2UgcGluIHRoZSBoZWlnaHQgdG8gdGhlIHdpZHRoXG5cdCAqIHRvIGtlZXAgdGhlIGFzcGVjdCByYXRpbyBjb3JyZWN0XG5cdCAqL1xuXHRzZXRDaGFydERpbWVuc2lvbnMod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGZvcmNlOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcblx0XHRpZiAoKGZvcmNlIHx8IHRoaXMucmVzaXplQ2hhcnQpICYmIG51bGwgIT0gdGhpcy5jaGFydC53aWR0aCkge1xuXHRcdFx0aWYgKG51bGwgIT0gd2lkdGggJiYgdGhpcy5jaGFydC53aWR0aCgpICE9PSB3aWR0aCkge1xuXHRcdFx0XHQvLyBwaW4gdGhlIGhlaWdodCB0byB0aGUgd2lkdGhcblx0XHRcdFx0dGhpcy5jaGFydFxuXHRcdFx0XHRcdC53aWR0aCh3aWR0aClcblx0XHRcdFx0XHQuaGVpZ2h0KHdpZHRoKVxuXHRcdFx0XHRcdC5yZXNpemUoKS5yZWRyYXcoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcblx0b25SZXNpemUoZXZlbnQ6IGFueSkge1xuXHRcdGlmICh0aGlzLnJlc2l6ZUNoYXJ0KSB7XG5cdFx0XHR0aGlzLmRlbGF5UmVzaXplKCk7XG5cdFx0fVxuXHR9XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0aWYgKHRoaXMucmVzaXplQ2hhcnQpIHtcblx0XHRcdHRoaXMucmVzaXplKCk7XG5cdFx0fVxuXHR9XG5cblx0bmdPbkNoYW5nZXMoY2hhbmdlczogeyBba2V5OiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfSkge1xuXHRcdGxldCByZWRyYXc6IGJvb2xlYW4gPSBmYWxzZTtcblxuXHRcdC8vIENhbGwgdGhlIGNvbmZpZ3VyZSBmdW5jdGlvblxuXHRcdGlmIChjaGFuZ2VzWydjb25maWd1cmVGbiddICYmIGNoYW5nZXNbJ2NvbmZpZ3VyZUZuJ10uaXNGaXJzdENoYW5nZSgpXG5cdFx0XHRcdCYmIG51bGwgIT0gY2hhbmdlc1snY29uZmlndXJlRm4nXS5jdXJyZW50VmFsdWUpIHtcblx0XHRcdHRoaXMuY29uZmlndXJlRm4odGhpcy5jaGFydCk7XG5cdFx0fVxuXG5cdFx0aWYgKGNoYW5nZXNbJ21vZGVsJ10pIHtcblx0XHRcdHRoaXMuY2hhcnQuZGF0YShjaGFuZ2VzWydtb2RlbCddLmN1cnJlbnRWYWx1ZSk7XG5cdFx0XHRyZWRyYXcgPSB0cnVlO1xuXHRcdH1cblx0XHRpZiAoY2hhbmdlc1snZHVyYXRpb24nXSkge1xuXHRcdFx0dGhpcy5jaGFydC5kdXJhdGlvbihjaGFuZ2VzWydkdXJhdGlvbiddLmN1cnJlbnRWYWx1ZSk7XG5cdFx0fVxuXHRcdGlmIChjaGFuZ2VzWydjb2xvclNjYWxlJ10pIHtcblx0XHRcdHRoaXMuY2hhcnQuY29sb3IoY2hhbmdlc1snY29sb3JTY2FsZSddLmN1cnJlbnRWYWx1ZSk7XG5cdFx0XHRyZWRyYXcgPSB0cnVlO1xuXHRcdH1cblxuXHRcdC8vIE9ubHkgcmVkcmF3IG9uY2UgaWYgcG9zc2libGVcblx0XHRpZiAocmVkcmF3KSB7XG5cdFx0XHR0aGlzLmNoYXJ0LnJlZHJhdygpO1xuXHRcdH1cblx0fVxuXG59XG4iXX0=
