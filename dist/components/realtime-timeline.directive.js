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
var RealtimeTimelineDirective = (function (_super) {
    __extends(RealtimeTimelineDirective, _super);
    function RealtimeTimelineDirective(el) {
        _super.call(this, el, sentio.realtime.timeline());
        this.markerOver = new core_1.EventEmitter();
        this.markerOut = new core_1.EventEmitter();
        this.markerClick = new core_1.EventEmitter();
    }
    /**
     * For the timeline, both dimensions scale independently
     */
    RealtimeTimelineDirective.prototype.setChartDimensions = function (width, height, force) {
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
    RealtimeTimelineDirective.prototype.onResize = function (event) {
        if (this.resizeHeight || this.resizeWidth) {
            this.delayResize();
        }
    };
    RealtimeTimelineDirective.prototype.ngOnInit = function () {
        var _this = this;
        // Do the initial resize if either dimension is supposed to resize
        if (this.resizeHeight || this.resizeWidth) {
            this.resize();
        }
        // register for the marker events
        this.chart.dispatch().on('markerClick', function (p) { _this.markerClick.emit(p); });
        this.chart.dispatch().on('markerMouseover', function (p) { _this.markerOver.emit(p); });
        this.chart.dispatch().on('markerMouseout', function (p) { _this.markerOut.emit(p); });
    };
    RealtimeTimelineDirective.prototype.ngOnChanges = function (changes) {
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
        if (changes['markers']) {
            this.chart.markers(changes['markers'].currentValue);
            redraw = true;
        }
        if (changes['yExtent']) {
            this.chart.yExtent().overrideValue(changes['yExtent'].currentValue);
            redraw = true;
        }
        if (changes['xExtent']) {
            this.chart.xExtent().overrideValue(changes['xExtent'].currentValue);
            redraw = true;
        }
        if (changes['duration']) {
            this.chart.duration(changes['duration'].currentValue);
        }
        if (changes['fps']) {
            this.chart.fps(changes['fps'].currentValue);
        }
        if (changes['delay']) {
            this.chart.delay(changes['delay'].currentValue);
            redraw = true;
        }
        if (changes['interval']) {
            this.chart.interval(changes['interval'].currentValue);
            redraw = true;
        }
        if (redraw) {
            this.chart.redraw();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], RealtimeTimelineDirective.prototype, "model", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], RealtimeTimelineDirective.prototype, "markers", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], RealtimeTimelineDirective.prototype, "yExtent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], RealtimeTimelineDirective.prototype, "xExtent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], RealtimeTimelineDirective.prototype, "delay", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], RealtimeTimelineDirective.prototype, "fps", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], RealtimeTimelineDirective.prototype, "interval", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], RealtimeTimelineDirective.prototype, "resizeWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], RealtimeTimelineDirective.prototype, "resizeHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], RealtimeTimelineDirective.prototype, "duration", void 0);
    __decorate([
        core_1.Input('configure'), 
        __metadata('design:type', Function)
    ], RealtimeTimelineDirective.prototype, "configureFn", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], RealtimeTimelineDirective.prototype, "markerOver", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], RealtimeTimelineDirective.prototype, "markerOut", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], RealtimeTimelineDirective.prototype, "markerClick", void 0);
    __decorate([
        core_1.HostListener('window:resize', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], RealtimeTimelineDirective.prototype, "onResize", null);
    RealtimeTimelineDirective = __decorate([
        core_1.Directive({
            selector: 'realtime-timeline'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], RealtimeTimelineDirective);
    return RealtimeTimelineDirective;
}(base_chart_directive_1.BaseChartDirective));
exports.RealtimeTimelineDirective = RealtimeTimelineDirective;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvcmVhbHRpbWUtdGltZWxpbmUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFCQUEwRyxlQUFlLENBQUMsQ0FBQTtBQUMxSCxJQUFZLE1BQU0sV0FBTSxvQkFBb0IsQ0FBQyxDQUFBO0FBRTdDLHFDQUFtQyx3QkFBd0IsQ0FBQyxDQUFBO0FBTTVEO0lBQ1MsNkNBQWtCO0lBcUIxQixtQ0FBWSxFQUFjO1FBQ3pCLGtCQUFNLEVBQUUsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFMN0IsZUFBVSxHQUF5QixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUN0RCxjQUFTLEdBQXlCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQ3JELGdCQUFXLEdBQXlCLElBQUksbUJBQVksRUFBRSxDQUFDO0lBSWpFLENBQUM7SUFFRDs7T0FFRztJQUNILHNEQUFrQixHQUFsQixVQUFtQixLQUFhLEVBQUUsTUFBYyxFQUFFLEtBQXNCO1FBQXRCLHFCQUFzQixHQUF0QixhQUFzQjtRQUN2RSxJQUFJLE1BQU0sR0FBWSxLQUFLLENBQUM7UUFFNUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDN0QsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ25ELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN4QixNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ2YsQ0FBQztRQUNGLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsWUFBWSxD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O1FBQ2YsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDWixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3JCLENBQUM7SUFDRixDQUFDO0lBaEhEO1FBQUMsWUFBSyxFQUFFOzs0REFBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzs4REFBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzs4REFBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzs4REFBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzs0REFBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzswREFBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzsrREFBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOztrRUFBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzttRUFBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzsrREFBQTtJQUVSO1FBQUMsWUFBSyxDQUFDLFdBQVcsQ0FBQzs7a0VBQUE7SUFFbkI7UUFBQyxhQUFNLEVBQUU7O2lFQUFBO0lBQ1Q7UUFBQyxhQUFNLEVBQUU7O2dFQUFBO0lBQ1Q7UUFBQyxhQUFNLEVBQUU7O2tFQUFBO0lBK0JUO1FBQUMsbUJBQVksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozs2REFBQTtJQXREM0M7UUFBQyxnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLG1CQUFtQjtTQUM3QixDQUFDOztpQ0FBQTtJQXVIRixnQ0FBQztBQUFELENBdEhBLEFBc0hDLENBckhRLHlDQUFrQixHQXFIMUI7QUF0SFksaUNBQXlCLDRCQXNIckMsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL3JlYWx0aW1lLXRpbWVsaW5lLmRpcmVjdGl2ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZSwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBzZW50aW8gZnJvbSAnQGFzeW1tZXRyaWsvc2VudGlvJztcblxuaW1wb3J0IHsgQmFzZUNoYXJ0RGlyZWN0aXZlIH0gZnJvbSAnLi9iYXNlLWNoYXJ0LmRpcmVjdGl2ZSc7XG5cblxuQERpcmVjdGl2ZSh7XG5cdHNlbGVjdG9yOiAncmVhbHRpbWUtdGltZWxpbmUnXG59KVxuZXhwb3J0IGNsYXNzIFJlYWx0aW1lVGltZWxpbmVEaXJlY3RpdmVcblx0ZXh0ZW5kcyBCYXNlQ2hhcnREaXJlY3RpdmVcblx0aW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG5cdEBJbnB1dCgpIG1vZGVsOiBPYmplY3RbXTtcblx0QElucHV0KCkgbWFya2VyczogT2JqZWN0W107XG5cdEBJbnB1dCgpIHlFeHRlbnQ6IE9iamVjdFtdO1xuXHRASW5wdXQoKSB4RXh0ZW50OiBPYmplY3RbXTtcblx0QElucHV0KCkgZGVsYXk6IG51bWJlcjtcblx0QElucHV0KCkgZnBzOiBudW1iZXI7XG5cdEBJbnB1dCgpIGludGVydmFsOiBudW1iZXI7XG5cblx0QElucHV0KCkgcmVzaXplV2lkdGg6IGJvb2xlYW47XG5cdEBJbnB1dCgpIHJlc2l6ZUhlaWdodDogYm9vbGVhbjtcblx0QElucHV0KCkgZHVyYXRpb246IG51bWJlcjtcblxuXHRASW5wdXQoJ2NvbmZpZ3VyZScpIGNvbmZpZ3VyZUZuOiAoY2hhcnQ6IGFueSkgPT4gdm9pZDtcblxuXHRAT3V0cHV0KCkgbWFya2VyT3ZlcjogRXZlbnRFbWl0dGVyPE9iamVjdD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cdEBPdXRwdXQoKSBtYXJrZXJPdXQ6IEV2ZW50RW1pdHRlcjxPYmplY3Q+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXHRAT3V0cHV0KCkgbWFya2VyQ2xpY2s6IEV2ZW50RW1pdHRlcjxPYmplY3Q+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cdGNvbnN0cnVjdG9yKGVsOiBFbGVtZW50UmVmKSB7XG5cdFx0c3VwZXIoZWwsIHNlbnRpby5yZWFsdGltZS50aW1lbGluZSgpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBGb3IgdGhlIHRpbWVsaW5lLCBib3RoIGRpbWVuc2lvbnMgc2NhbGUgaW5kZXBlbmRlbnRseVxuXHQgKi9cblx0c2V0Q2hhcnREaW1lbnNpb25zKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBmb3JjZTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG5cdFx0bGV0IHJlZHJhdzogYm9vbGVhbiA9IGZhbHNlO1xuXG5cdFx0aWYgKChmb3JjZSB8fCB0aGlzLnJlc2l6ZVdpZHRoKSAmJiBudWxsICE9IHRoaXMuY2hhcnQud2lkdGgpIHtcblx0XHRcdGlmIChudWxsICE9IHdpZHRoICYmIHRoaXMuY2hhcnQud2lkdGgoKSAhPT0gd2lkdGgpIHtcblx0XHRcdFx0dGhpcy5jaGFydC53aWR0aCh3aWR0aCk7XG5cdFx0XHRcdHJlZHJhdyA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKChmb3JjZSB8fCB0aGlzLnJlc2l6ZUhlaWdodCkgJiYgbnVsbCAhPSB0aGlzLmNoYXJ0LmhlaWdodCkge1xuXHRcdFx0aWYgKG51bGwgIT0gaGVpZ2h0ICYmIHRoaXMuY2hhcnQuaGVpZ2h0KCkgIT09IGhlaWdodCkge1xuXHRcdFx0XHR0aGlzLmNoYXJ0LmhlaWdodChoZWlnaHQpO1xuXHRcdFx0XHRyZWRyYXcgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChyZWRyYXcpIHtcblx0XHRcdHRoaXMuY2hhcnQucmVzaXplKCkucmVkcmF3KCk7XG5cdFx0fVxuXHR9XG5cblx0QEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXG5cdG9uUmVzaXplKGV2ZW50OiBhbnkpIHtcblx0XHRpZiAodGhpcy5yZXNpemVIZWlnaHQgfHwgdGhpcy5yZXNpemVXaWR0aCkge1xuXHRcdFx0dGhpcy5kZWxheVJlc2l6ZSgpO1xuXHRcdH1cblx0fVxuXG5cdG5nT25Jbml0KCkge1xuXHRcdC8vIERvIHRoZSBpbml0aWFsIHJlc2l6ZSBpZiBlaXRoZXIgZGltZW5zaW9uIGlzIHN1cHBvc2VkIHRvIHJlc2l6ZVxuXHRcdGlmICh0aGlzLnJlc2l6ZUhlaWdodCB8fCB0aGlzLnJlc2l6ZVdpZHRoKSB7XG5cdFx0XHR0aGlzLnJlc2l6ZSgpO1xuXHRcdH1cblxuXHRcdC8vIHJlZ2lzdGVyIGZvciB0aGUgbWFya2VyIGV2ZW50c1xuXHRcdHRoaXMuY2hhcnQuZGlzcGF0Y2goKS5vbignbWFya2VyQ2xpY2snLCAocDogYW55KSA9PiB7IHRoaXMubWFya2VyQ2xpY2suZW1pdChwKTsgfSk7XG5cdFx0dGhpcy5jaGFydC5kaXNwYXRjaCgpLm9uKCdtYXJrZXJNb3VzZW92ZXInLCAocDogYW55KSA9PiB7IHRoaXMubWFya2VyT3Zlci5lbWl0KHApOyB9KTtcblx0XHR0aGlzLmNoYXJ0LmRpc3BhdGNoKCkub24oJ21hcmtlck1vdXNlb3V0JywgKHA6IGFueSkgPT4geyB0aGlzLm1hcmtlck91dC5lbWl0KHApOyB9KTtcblxuXHR9XG5cblx0bmdPbkNoYW5nZXMoY2hhbmdlczogeyBba2V5OiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfSkge1xuXG5cdFx0bGV0IHJlZHJhdzogYm9vbGVhbiA9IGZhbHNlO1xuXG5cdFx0Ly8gQ2FsbCB0aGUgY29uZmlndXJlIGZ1bmN0aW9uXG5cdFx0aWYgKGNoYW5nZXNbJ2NvbmZpZ3VyZUZuJ10gJiYgY2hhbmdlc1snY29uZmlndXJlRm4nXS5pc0ZpcnN0Q2hhbmdlKClcblx0XHRcdFx0JiYgbnVsbCAhPSBjaGFuZ2VzWydjb25maWd1cmVGbiddLmN1cnJlbnRWYWx1ZSkge1xuXHRcdFx0dGhpcy5jb25maWd1cmVGbih0aGlzLmNoYXJ0KTtcblx0XHR9XG5cblx0XHRpZiAoY2hhbmdlc1snbW9kZWwnXSkge1xuXHRcdFx0dGhpcy5jaGFydC5kYXRhKGNoYW5nZXNbJ21vZGVsJ10uY3VycmVudFZhbHVlKTtcblx0XHRcdHJlZHJhdyA9IHRydWU7XG5cdFx0fVxuXHRcdGlmIChjaGFuZ2VzWydtYXJrZXJzJ10pIHtcblx0XHRcdHRoaXMuY2hhcnQubWFya2VycyhjaGFuZ2VzWydtYXJrZXJzJ10uY3VycmVudFZhbHVlKTtcblx0XHRcdHJlZHJhdyA9IHRydWU7XG5cdFx0fVxuXHRcdGlmIChjaGFuZ2VzWyd5RXh0ZW50J10pIHtcblx0XHRcdHRoaXMuY2hhcnQueUV4dGVudCgpLm92ZXJyaWRlVmFsdWUoY2hhbmdlc1sneUV4dGVudCddLmN1cnJlbnRWYWx1ZSk7XG5cdFx0XHRyZWRyYXcgPSB0cnVlO1xuXHRcdH1cblx0XHRpZiAoY2hhbmdlc1sneEV4dGVudCddKSB7XG5cdFx0XHR0aGlzLmNoYXJ0LnhFeHRlbnQoKS5vdmVycmlkZVZhbHVlKGNoYW5nZXNbJ3hFeHRlbnQnXS5jdXJyZW50VmFsdWUpO1xuXHRcdFx0cmVkcmF3ID0gdHJ1ZTtcblx0XHR9XG5cdFx0aWYgKGNoYW5nZXNbJ2R1cmF0aW9uJ10pIHtcblx0XHRcdHRoaXMuY2hhcnQuZHVyYXRpb24oY2hhbmdlc1snZHVyYXRpb24nXS5jdXJyZW50VmFsdWUpO1xuXHRcdH1cblxuXHRcdGlmIChjaGFuZ2VzWydmcHMnXSkge1xuXHRcdFx0dGhpcy5jaGFydC5mcHMoY2hhbmdlc1snZnBzJ10uY3VycmVudFZhbHVlKTtcblx0XHR9XG5cdFx0aWYgKGNoYW5nZXNbJ2RlbGF5J10pIHtcblx0XHRcdHRoaXMuY2hhcnQuZGVsYXkoY2hhbmdlc1snZGVsYXknXS5jdXJyZW50VmFsdWUpO1xuXHRcdFx0cmVkcmF3ID0gdHJ1ZTtcblx0XHR9XG5cdFx0aWYgKGNoYW5nZXNbJ2ludGVydmFsJ10pIHtcblx0XHRcdHRoaXMuY2hhcnQuaW50ZXJ2YWwoY2hhbmdlc1snaW50ZXJ2YWwnXS5jdXJyZW50VmFsdWUpO1xuXHRcdFx0cmVkcmF3ID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRpZiAocmVkcmF3KSB7XG5cdFx0XHR0aGlzLmNoYXJ0LnJlZHJhdygpO1xuXHRcdH1cblx0fVxuXG59XG4iXX0=
