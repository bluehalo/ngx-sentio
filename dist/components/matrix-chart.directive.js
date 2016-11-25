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
var MatrixChartDirective = (function (_super) {
    __extends(MatrixChartDirective, _super);
    function MatrixChartDirective(el) {
        _super.call(this, el, sentio.chart.matrix());
    }
    /**
     * For the matrix chart, we scale height and width independently
     */
    MatrixChartDirective.prototype.setChartDimensions = function (width, height, force) {
        if (force === void 0) { force = false; }
        var redraw = false;
        if ((force || this.resizeWidth) && null != this.chart.width) {
            if (null != width && this.chart.width() !== width) {
                this.chart.width(width);
                redraw = true;
            }
        }
        if ((force || this.resizeHeight) && null != this.chart.height) {
            if (null != height && this.chart.height() !== height) {
                this.chart.height(height);
                redraw = true;
            }
        }
        if (redraw) {
            this.chart.resize().redraw();
        }
    };
    MatrixChartDirective.prototype.onResize = function (event) {
        if (this.resizeHeight || this.resizeWidth) {
            this.delayResize();
        }
    };
    MatrixChartDirective.prototype.ngOnInit = function () {
        // Do the initial resize if either dimension is supposed to resize
        if (this.resizeHeight || this.resizeWidth) {
            this.resize();
        }
    };
    MatrixChartDirective.prototype.ngOnChanges = function (changes) {
        var redraw = false;
        // Call the configure function
        if (changes['configureFn'] && changes['configureFn'].isFirstChange()
            && null != changes['configureFn'].currentValue) {
            this.configureFn(this.chart);
            redraw = true;
        }
        if (changes['model']) {
            this.chart.data(changes['model'].currentValue);
            redraw = true;
        }
        if (changes['duration']) {
            this.chart.duration(changes['duration'].currentValue);
        }
        // Only redraw once if possible
        if (redraw) {
            this.chart.redraw();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], MatrixChartDirective.prototype, "model", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], MatrixChartDirective.prototype, "resizeHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], MatrixChartDirective.prototype, "resizeWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], MatrixChartDirective.prototype, "duration", void 0);
    __decorate([
        core_1.Input('configure'), 
        __metadata('design:type', Function)
    ], MatrixChartDirective.prototype, "configureFn", void 0);
    __decorate([
        core_1.HostListener('window:resize', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], MatrixChartDirective.prototype, "onResize", null);
    MatrixChartDirective = __decorate([
        core_1.Directive({
            selector: 'matrix-chart'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], MatrixChartDirective);
    return MatrixChartDirective;
}(base_chart_directive_1.BaseChartDirective));
exports.MatrixChartDirective = MatrixChartDirective;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbWF0cml4LWNoYXJ0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQkFBb0YsZUFBZSxDQUFDLENBQUE7QUFDcEcsSUFBWSxNQUFNLFdBQU0sb0JBQW9CLENBQUMsQ0FBQTtBQUU3QyxxQ0FBbUMsd0JBQXdCLENBQUMsQ0FBQTtBQU01RDtJQUNTLHdDQUFrQjtJQVcxQiw4QkFBWSxFQUFjO1FBQ3pCLGtCQUFNLEVBQUUsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsaURBQWtCLEdBQWxCLFVBQW1CLEtBQWEsRUFBRSxNQUFjLEVBQUUsS0FBc0I7UUFBdEIscUJBQXNCLEdBQXRCLGFBQXNCO1FBQ3ZFLElBQUksTUFBTSxHQUFZLEtBQUssQ0FBQztRQUU1QixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUM3RCxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDbkQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3hCLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDZixDQUFDO1FBQ0YsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQy9ELEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUN0RCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDMUIsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNmLENBQUM7UUFDRixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNaLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDOUIsQ0FBQztJQUNGLENBQUM7SUFHRCx1Q0FBUSxHQUFSLFVBQVMsS0FBVTtRQUNsQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNwQixDQUFDO0lBQ0YsQ0FBQztJQUVELHVDQUFRLEdBQVI7UUFDQyxrRUFBa0U7UUFDbEUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZixDQUFDO0lBQ0YsQ0FBQztJQUVELDBDQUFXLEdBQVgsVUFBWSxPQUF3QztRQUNuRCxJQUFJLE1BQU0sR0FBWSxLQUFLLENBQUM7UUFFNUIsOEJBQThCO1FBQzlCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsYUFBYSxFQUFFO2VBQy9ELElBQUksSUFBSSxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3QixNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2YsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQy9DLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDZixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdkQsQ0FBQztRQUVELCtCQUErQjtRQUMvQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNyQixDQUFDO0lBQ0YsQ0FBQztJQXpFRDtRQUFDLFlBQUssRUFBRTs7dURBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7OERBQUE7SUFDUjtRQUFDLFlBQUssRUFBRTs7NkRBQUE7SUFDUjtRQUFDLFlBQUssRUFBRTs7MERBQUE7SUFFUjtRQUFDLFlBQUssQ0FBQyxXQUFXLENBQUM7OzZEQUFBO0lBK0JuQjtRQUFDLG1CQUFZLENBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7d0RBQUE7SUE1QzNDO1FBQUMsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxjQUFjO1NBQ3hCLENBQUM7OzRCQUFBO0lBK0VGLDJCQUFDO0FBQUQsQ0E5RUEsQUE4RUMsQ0E3RVEseUNBQWtCLEdBNkUxQjtBQTlFWSw0QkFBb0IsdUJBOEVoQyxDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvbWF0cml4LWNoYXJ0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2UgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIHNlbnRpbyBmcm9tICdAYXN5bW1ldHJpay9zZW50aW8nO1xuXG5pbXBvcnQgeyBCYXNlQ2hhcnREaXJlY3RpdmUgfSBmcm9tICcuL2Jhc2UtY2hhcnQuZGlyZWN0aXZlJztcblxuXG5ARGlyZWN0aXZlKHtcblx0c2VsZWN0b3I6ICdtYXRyaXgtY2hhcnQnXG59KVxuZXhwb3J0IGNsYXNzIE1hdHJpeENoYXJ0RGlyZWN0aXZlXG5cdGV4dGVuZHMgQmFzZUNoYXJ0RGlyZWN0aXZlXG5cdGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuXHRASW5wdXQoKSBtb2RlbDogT2JqZWN0W107XG5cblx0QElucHV0KCkgcmVzaXplSGVpZ2h0OiBib29sZWFuO1xuXHRASW5wdXQoKSByZXNpemVXaWR0aDogYm9vbGVhbjtcblx0QElucHV0KCkgZHVyYXRpb246IG51bWJlcjtcblxuXHRASW5wdXQoJ2NvbmZpZ3VyZScpIGNvbmZpZ3VyZUZuOiAoY2hhcnQ6IGFueSkgPT4gdm9pZDtcblxuXHRjb25zdHJ1Y3RvcihlbDogRWxlbWVudFJlZikge1xuXHRcdHN1cGVyKGVsLCBzZW50aW8uY2hhcnQubWF0cml4KCkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEZvciB0aGUgbWF0cml4IGNoYXJ0LCB3ZSBzY2FsZSBoZWlnaHQgYW5kIHdpZHRoIGluZGVwZW5kZW50bHlcblx0ICovXG5cdHNldENoYXJ0RGltZW5zaW9ucyh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgZm9yY2U6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuXHRcdGxldCByZWRyYXc6IGJvb2xlYW4gPSBmYWxzZTtcblxuXHRcdGlmICgoZm9yY2UgfHwgdGhpcy5yZXNpemVXaWR0aCkgJiYgbnVsbCAhPSB0aGlzLmNoYXJ0LndpZHRoKSB7XG5cdFx0XHRpZiAobnVsbCAhPSB3aWR0aCAmJiB0aGlzLmNoYXJ0LndpZHRoKCkgIT09IHdpZHRoKSB7XG5cdFx0XHRcdHRoaXMuY2hhcnQud2lkdGgod2lkdGgpO1xuXHRcdFx0XHRyZWRyYXcgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICgoZm9yY2UgfHwgdGhpcy5yZXNpemVIZWlnaHQpICYmIG51bGwgIT0gdGhpcy5jaGFydC5oZWlnaHQpIHtcblx0XHRcdGlmIChudWxsICE9IGhlaWdodCAmJiB0aGlzLmNoYXJ0LmhlaWdodCgpICE9PSBoZWlnaHQpIHtcblx0XHRcdFx0dGhpcy5jaGFydC5oZWlnaHQoaGVpZ2h0KTtcblx0XHRcdFx0cmVkcmF3ID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAocmVkcmF3KSB7XG5cdFx0XHR0aGlzLmNoYXJ0LnJlc2l6ZSgpLnJlZHJhdygpO1xuXHRcdH1cblx0fVxuXG5cdEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbJyRldmVudCddKVxuXHRvblJlc2l6ZShldmVudDogYW55KSB7XG5cdFx0aWYgKHRoaXMucmVzaXplSGVpZ2h0IHx8IHRoaXMucmVzaXplV2lkdGgpIHtcblx0XHRcdHRoaXMuZGVsYXlSZXNpemUoKTtcblx0XHR9XG5cdH1cblxuXHRuZ09uSW5pdCgpIHtcblx0XHQvLyBEbyB0aGUgaW5pdGlhbCByZXNpemUgaWYgZWl0aGVyIGRpbWVuc2lvbiBpcyBzdXBwb3NlZCB0byByZXNpemVcblx0XHRpZiAodGhpcy5yZXNpemVIZWlnaHQgfHwgdGhpcy5yZXNpemVXaWR0aCkge1xuXHRcdFx0dGhpcy5yZXNpemUoKTtcblx0XHR9XG5cdH1cblxuXHRuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtrZXk6IHN0cmluZ106IFNpbXBsZUNoYW5nZSB9KSB7XG5cdFx0bGV0IHJlZHJhdzogYm9vbGVhbiA9IGZhbHNlO1xuXG5cdFx0Ly8gQ2FsbCB0aGUgY29uZmlndXJlIGZ1bmN0aW9uXG5cdFx0aWYgKGNoYW5nZXNbJ2NvbmZpZ3VyZUZuJ10gJiYgY2hhbmdlc1snY29uZmlndXJlRm4nXS5pc0ZpcnN0Q2hhbmdlKClcblx0XHRcdFx0JiYgbnVsbCAhPSBjaGFuZ2VzWydjb25maWd1cmVGbiddLmN1cnJlbnRWYWx1ZSkge1xuXHRcdFx0dGhpcy5jb25maWd1cmVGbih0aGlzLmNoYXJ0KTtcblx0XHRcdHJlZHJhdyA9IHRydWU7XG5cdFx0fVxuXG5cdFx0aWYgKGNoYW5nZXNbJ21vZGVsJ10pIHtcblx0XHRcdHRoaXMuY2hhcnQuZGF0YShjaGFuZ2VzWydtb2RlbCddLmN1cnJlbnRWYWx1ZSk7XG5cdFx0XHRyZWRyYXcgPSB0cnVlO1xuXHRcdH1cblx0XHRpZiAoY2hhbmdlc1snZHVyYXRpb24nXSkge1xuXHRcdFx0dGhpcy5jaGFydC5kdXJhdGlvbihjaGFuZ2VzWydkdXJhdGlvbiddLmN1cnJlbnRWYWx1ZSk7XG5cdFx0fVxuXG5cdFx0Ly8gT25seSByZWRyYXcgb25jZSBpZiBwb3NzaWJsZVxuXHRcdGlmIChyZWRyYXcpIHtcblx0XHRcdHRoaXMuY2hhcnQucmVkcmF3KCk7XG5cdFx0fVxuXHR9XG59XG4iXX0=
