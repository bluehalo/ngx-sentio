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
var TimelineLineDirective = (function (_super) {
    __extends(TimelineLineDirective, _super);
    function TimelineLineDirective(el) {
        _super.call(this, el, sentio.timeline.line());
        this.filterChange = new core_1.EventEmitter();
        this.markerOver = new core_1.EventEmitter();
        this.markerOut = new core_1.EventEmitter();
        this.markerClick = new core_1.EventEmitter();
        /**
         * Did the state of the filter change?
         */
        this.didFilterChange = function (current, previous) {
            // Deep compare the filter
            if (current === previous ||
                (null != current && null != previous
                    && current[0] === previous[0]
                    && current[1] === previous[1])) {
                return false;
            }
            // We know it changed
            return true;
        };
    }
    /**
     * For the timeline, both dimensions scale independently
     */
    TimelineLineDirective.prototype.setChartDimensions = function (width, height, force) {
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
    TimelineLineDirective.prototype.onResize = function (event) {
        if (this.resizeHeight || this.resizeWidth) {
            this.delayResize();
        }
    };
    TimelineLineDirective.prototype.ngOnInit = function () {
        var _this = this;
        // Do the initial resize if either dimension is supposed to resize
        if (this.resizeHeight || this.resizeWidth) {
            this.resize();
        }
        // register for the filter end event
        this.chart.dispatch().on('filterend', function (fs) {
            // If the filter actually changed, emit the event
            if (_this.didFilterChange(fs, _this.filterState)) {
                setTimeout(function () { _this.filterChange.emit(fs); });
            }
        });
        // register for the marker events
        this.chart.dispatch().on('markerClick', function (p) { _this.markerClick.emit(p); });
        this.chart.dispatch().on('markerMouseover', function (p) { _this.markerOver.emit(p); });
        this.chart.dispatch().on('markerMouseout', function (p) { _this.markerOut.emit(p); });
    };
    TimelineLineDirective.prototype.ngOnChanges = function (changes) {
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
        if (changes['filterEnabled']) {
            this.chart.filter(changes['filterEnabled'].currentValue);
            redraw = true;
        }
        if (changes['filterState']) {
            // Only do anything if the filter is changing
            if (changes['filterState'].isFirstChange()
                || this.didFilterChange(changes['filterState'].currentValue, changes['filterState'].previousValue)) {
                this.chart.setFilter(changes['filterState'].currentValue);
                redraw = true;
            }
        }
        if (changes['markers']) {
            this.chart.markers(changes['markers'].currentValue);
            redraw = true;
        }
        if (redraw) {
            this.chart.redraw();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TimelineLineDirective.prototype, "model", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TimelineLineDirective.prototype, "markers", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TimelineLineDirective.prototype, "yExtent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TimelineLineDirective.prototype, "xExtent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TimelineLineDirective.prototype, "resizeWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TimelineLineDirective.prototype, "resizeHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TimelineLineDirective.prototype, "duration", void 0);
    __decorate([
        core_1.Input('configure'), 
        __metadata('design:type', Function)
    ], TimelineLineDirective.prototype, "configureFn", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TimelineLineDirective.prototype, "filterEnabled", void 0);
    __decorate([
        core_1.Input('filter'), 
        __metadata('design:type', Array)
    ], TimelineLineDirective.prototype, "filterState", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TimelineLineDirective.prototype, "filterChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TimelineLineDirective.prototype, "markerOver", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TimelineLineDirective.prototype, "markerOut", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TimelineLineDirective.prototype, "markerClick", void 0);
    __decorate([
        core_1.HostListener('window:resize', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], TimelineLineDirective.prototype, "onResize", null);
    TimelineLineDirective = __decorate([
        core_1.Directive({
            selector: 'timeline-line'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], TimelineLineDirective);
    return TimelineLineDirective;
}(base_chart_directive_1.BaseChartDirective));
exports.TimelineLineDirective = TimelineLineDirective;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdGltZWxpbmUtbGluZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUJBQTBHLGVBQWUsQ0FBQyxDQUFBO0FBQzFILElBQVksTUFBTSxXQUFNLG9CQUFvQixDQUFDLENBQUE7QUFFN0MscUNBQW1DLHdCQUF3QixDQUFDLENBQUE7QUFNNUQ7SUFDUyx5Q0FBa0I7SUFzQjFCLCtCQUFZLEVBQWM7UUFDekIsa0JBQU0sRUFBRSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQVB6QixpQkFBWSxHQUEyQixJQUFJLG1CQUFZLEVBQVksQ0FBQztRQUVwRSxlQUFVLEdBQXlCLElBQUksbUJBQVksRUFBVSxDQUFDO1FBQzlELGNBQVMsR0FBeUIsSUFBSSxtQkFBWSxFQUFVLENBQUM7UUFDN0QsZ0JBQVcsR0FBeUIsSUFBSSxtQkFBWSxFQUFVLENBQUM7UUErQnpFOztXQUVHO1FBQ0gsb0JBQWUsR0FBRyxVQUFDLE9BQWlCLEVBQUUsUUFBa0I7WUFFdkQsMEJBQTBCO1lBQzFCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxRQUFRO2dCQUN2QixDQUFDLElBQUksSUFBSSxPQUFPLElBQUksSUFBSSxJQUFJLFFBQVE7dUJBQ2pDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO3VCQUMxQixPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2QsQ0FBQztZQUVELHFCQUFxQjtZQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2IsQ0FBQyxDQUFBO0lBMUNELENBQUM7SUFFRDs7T0FFRztJQUNILGtEQUFrQixHQUFsQixVQUFtQixLQUFhLEVBQUUsTUFBYyxFQUFFLEtBQXNCO1FBQXRCLHFCQUFzQixHQUF0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WUFBSyxFQUFFOzswREFBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzswREFBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzswREFBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOzs4REFBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzsrREFBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzsyREFBQTtJQUVSO1FBQUMsWUFBSyxDQUFDLFdBQVcsQ0FBQzs7OERBQUE7SUFFbkI7UUFBQyxZQUFLLEVBQUU7O2dFQUFBO0lBQ1I7UUFBQyxZQUFLLENBQUMsUUFBUSxDQUFDOzs4REFBQTtJQUNoQjtRQUFDLGFBQU0sRUFBRTs7K0RBQUE7SUFFVDtRQUFDLGFBQU0sRUFBRTs7NkRBQUE7SUFDVDtRQUFDLGFBQU0sRUFBRTs7NERBQUE7SUFDVDtRQUFDLGFBQU0sRUFBRTs7OERBQUE7SUFnRFQ7UUFBQyxtQkFBWSxDQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7O3lEQUFBO0lBeEUzQztRQUFDLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsZUFBZTtTQUN6QixDQUFDOzs2QkFBQTtJQXNKRiw0QkFBQztBQUFELENBckpBLEFBcUpDLENBcEpRLHlDQUFrQixHQW9KMUI7QUFySlksNkJBQXFCLHdCQXFKakMsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL3RpbWVsaW5lLWxpbmUuZGlyZWN0aXZlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIHNlbnRpbyBmcm9tICdAYXN5bW1ldHJpay9zZW50aW8nO1xuXG5pbXBvcnQgeyBCYXNlQ2hhcnREaXJlY3RpdmUgfSBmcm9tICcuL2Jhc2UtY2hhcnQuZGlyZWN0aXZlJztcblxuXG5ARGlyZWN0aXZlKHtcblx0c2VsZWN0b3I6ICd0aW1lbGluZS1saW5lJ1xufSlcbmV4cG9ydCBjbGFzcyBUaW1lbGluZUxpbmVEaXJlY3RpdmVcblx0ZXh0ZW5kcyBCYXNlQ2hhcnREaXJlY3RpdmVcblx0aW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG5cdEBJbnB1dCgpIG1vZGVsOiBPYmplY3RbXTtcblx0QElucHV0KCkgbWFya2VyczogT2JqZWN0W107XG5cdEBJbnB1dCgpIHlFeHRlbnQ6IE9iamVjdFtdO1xuXHRASW5wdXQoKSB4RXh0ZW50OiBPYmplY3RbXTtcblxuXHRASW5wdXQoKSByZXNpemVXaWR0aDogYm9vbGVhbjtcblx0QElucHV0KCkgcmVzaXplSGVpZ2h0OiBib29sZWFuO1xuXHRASW5wdXQoKSBkdXJhdGlvbjogbnVtYmVyO1xuXG5cdEBJbnB1dCgnY29uZmlndXJlJykgY29uZmlndXJlRm46IChjaGFydDogYW55KSA9PiB2b2lkO1xuXG5cdEBJbnB1dCgpIGZpbHRlckVuYWJsZWQ6IGJvb2xlYW47XG5cdEBJbnB1dCgnZmlsdGVyJykgZmlsdGVyU3RhdGU6IE9iamVjdFtdO1xuXHRAT3V0cHV0KCkgZmlsdGVyQ2hhbmdlOiBFdmVudEVtaXR0ZXI8T2JqZWN0W10+ID0gbmV3IEV2ZW50RW1pdHRlcjxPYmplY3RbXT4oKTtcblxuXHRAT3V0cHV0KCkgbWFya2VyT3ZlcjogRXZlbnRFbWl0dGVyPE9iamVjdD4gPSBuZXcgRXZlbnRFbWl0dGVyPE9iamVjdD4oKTtcblx0QE91dHB1dCgpIG1hcmtlck91dDogRXZlbnRFbWl0dGVyPE9iamVjdD4gPSBuZXcgRXZlbnRFbWl0dGVyPE9iamVjdD4oKTtcblx0QE91dHB1dCgpIG1hcmtlckNsaWNrOiBFdmVudEVtaXR0ZXI8T2JqZWN0PiA9IG5ldyBFdmVudEVtaXR0ZXI8T2JqZWN0PigpO1xuXG5cdGNvbnN0cnVjdG9yKGVsOiBFbGVtZW50UmVmKSB7XG5cdFx0c3VwZXIoZWwsIHNlbnRpby50aW1lbGluZS5saW5lKCkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEZvciB0aGUgdGltZWxpbmUsIGJvdGggZGltZW5zaW9ucyBzY2FsZSBpbmRlcGVuZGVudGx5XG5cdCAqL1xuXHRzZXRDaGFydERpbWVuc2lvbnMod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGZvcmNlOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcblx0XHRsZXQgcmVkcmF3OiBib29sZWFuID0gZmFsc2U7XG5cblx0XHRpZiAoKGZvcmNlIHx8IHRoaXMucmVzaXplV2lkdGgpICYmIG51bGwgIT0gdGhpcy5jaGFydC53aWR0aCkge1xuXHRcdFx0aWYgKG51bGwgIT0gd2lkdGggJiYgdGhpcy5jaGFydC53aWR0aCgpICE9PSB3aWR0aCkge1xuXHRcdFx0XHR0aGlzLmNoYXJ0LndpZHRoKHdpZHRoKTtcblx0XHRcdFx0cmVkcmF3ID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoKGZvcmNlIHx8IHRoaXMucmVzaXplSGVpZ2h0KSAmJiBudWxsICE9IHRoaXMuY2hhcnQuaGVpZ2h0KSB7XG5cdFx0XHRpZiAobnVsbCAhPSBoZWlnaHQgJiYgdGhpcy5jaGFydC5oZWlnaHQoKSAhPT0gaGVpZ2h0KSB7XG5cdFx0XHRcdHRoaXMuY2hhcnQuaGVpZ2h0KGhlaWdodCk7XG5cdFx0XHRcdHJlZHJhdyA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHJlZHJhdykge1xuXHRcdFx0dGhpcy5jaGFydC5yZXNpemUoKS5yZWRyYXcoKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogRGlkIHRoZSBzdGF0ZSBvZiB0aGUgZmlsdGVyIGNoYW5nZT9cblx0ICovXG5cdGRpZEZpbHRlckNoYW5nZSA9IChjdXJyZW50OiBPYmplY3RbXSwgcHJldmlvdXM6IE9iamVjdFtdKSA9PiB7XG5cblx0XHQvLyBEZWVwIGNvbXBhcmUgdGhlIGZpbHRlclxuXHRcdGlmIChjdXJyZW50ID09PSBwcmV2aW91cyB8fFxuXHRcdFx0KG51bGwgIT0gY3VycmVudCAmJiBudWxsICE9IHByZXZpb3VzXG5cdFx0XHQmJiBjdXJyZW50WzBdID09PSBwcmV2aW91c1swXVxuXHRcdFx0JiYgY3VycmVudFsxXSA9PT0gcHJldmlvdXNbMV0pKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gV2Uga25vdyBpdCBjaGFuZ2VkXG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcblx0b25SZXNpemUoZXZlbnQ6IGFueSkge1xuXHRcdGlmICh0aGlzLnJlc2l6ZUhlaWdodCB8fCB0aGlzLnJlc2l6ZVdpZHRoKSB7XG5cdFx0XHR0aGlzLmRlbGF5UmVzaXplKCk7XG5cdFx0fVxuXHR9XG5cblx0bmdPbkluaXQoKSB7XG5cblx0XHQvLyBEbyB0aGUgaW5pdGlhbCByZXNpemUgaWYgZWl0aGVyIGRpbWVuc2lvbiBpcyBzdXBwb3NlZCB0byByZXNpemVcblx0XHRpZiAodGhpcy5yZXNpemVIZWlnaHQgfHwgdGhpcy5yZXNpemVXaWR0aCkge1xuXHRcdFx0dGhpcy5yZXNpemUoKTtcblx0XHR9XG5cblx0XHQvLyByZWdpc3RlciBmb3IgdGhlIGZpbHRlciBlbmQgZXZlbnRcblx0XHR0aGlzLmNoYXJ0LmRpc3BhdGNoKCkub24oJ2ZpbHRlcmVuZCcsIChmczogYW55KSA9PiB7XG5cdFx0XHQvLyBJZiB0aGUgZmlsdGVyIGFjdHVhbGx5IGNoYW5nZWQsIGVtaXQgdGhlIGV2ZW50XG5cdFx0XHRpZiAodGhpcy5kaWRGaWx0ZXJDaGFuZ2UoZnMsIHRoaXMuZmlsdGVyU3RhdGUpKSB7XG5cdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4geyB0aGlzLmZpbHRlckNoYW5nZS5lbWl0KGZzKTsgfSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyByZWdpc3RlciBmb3IgdGhlIG1hcmtlciBldmVudHNcblx0XHR0aGlzLmNoYXJ0LmRpc3BhdGNoKCkub24oJ21hcmtlckNsaWNrJywgKHA6IGFueSkgPT4geyB0aGlzLm1hcmtlckNsaWNrLmVtaXQocCk7IH0pO1xuXHRcdHRoaXMuY2hhcnQuZGlzcGF0Y2goKS5vbignbWFya2VyTW91c2VvdmVyJywgKHA6IGFueSkgPT4geyB0aGlzLm1hcmtlck92ZXIuZW1pdChwKTsgfSk7XG5cdFx0dGhpcy5jaGFydC5kaXNwYXRjaCgpLm9uKCdtYXJrZXJNb3VzZW91dCcsIChwOiBhbnkpID0+IHsgdGhpcy5tYXJrZXJPdXQuZW1pdChwKTsgfSk7XG5cblx0fVxuXG5cdG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW2tleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pIHtcblxuXHRcdGxldCByZWRyYXc6IGJvb2xlYW4gPSBmYWxzZTtcblxuXHRcdC8vIENhbGwgdGhlIGNvbmZpZ3VyZSBmdW5jdGlvblxuXHRcdGlmIChjaGFuZ2VzWydjb25maWd1cmVGbiddICYmIGNoYW5nZXNbJ2NvbmZpZ3VyZUZuJ10uaXNGaXJzdENoYW5nZSgpXG5cdFx0XHRcdCYmIG51bGwgIT0gY2hhbmdlc1snY29uZmlndXJlRm4nXS5jdXJyZW50VmFsdWUpIHtcblx0XHRcdHRoaXMuY29uZmlndXJlRm4odGhpcy5jaGFydCk7XG5cdFx0fVxuXG5cdFx0aWYgKGNoYW5nZXNbJ21vZGVsJ10pIHtcblx0XHRcdHRoaXMuY2hhcnQuZGF0YShjaGFuZ2VzWydtb2RlbCddLmN1cnJlbnRWYWx1ZSk7XG5cdFx0XHRyZWRyYXcgPSB0cnVlO1xuXHRcdH1cblx0XHRpZiAoY2hhbmdlc1sneUV4dGVudCddKSB7XG5cdFx0XHR0aGlzLmNoYXJ0LnlFeHRlbnQoKS5vdmVycmlkZVZhbHVlKGNoYW5nZXNbJ3lFeHRlbnQnXS5jdXJyZW50VmFsdWUpO1xuXHRcdFx0cmVkcmF3ID0gdHJ1ZTtcblx0XHR9XG5cdFx0aWYgKGNoYW5nZXNbJ3hFeHRlbnQnXSkge1xuXHRcdFx0dGhpcy5jaGFydC54RXh0ZW50KCkub3ZlcnJpZGVWYWx1ZShjaGFuZ2VzWyd4RXh0ZW50J10uY3VycmVudFZhbHVlKTtcblx0XHRcdHJlZHJhdyA9IHRydWU7XG5cdFx0fVxuXHRcdGlmIChjaGFuZ2VzWydkdXJhdGlvbiddKSB7XG5cdFx0XHR0aGlzLmNoYXJ0LmR1cmF0aW9uKGNoYW5nZXNbJ2R1cmF0aW9uJ10uY3VycmVudFZhbHVlKTtcblx0XHR9XG5cblx0XHRpZiAoY2hhbmdlc1snZmlsdGVyRW5hYmxlZCddKSB7XG5cdFx0XHR0aGlzLmNoYXJ0LmZpbHRlcihjaGFuZ2VzWydmaWx0ZXJFbmFibGVkJ10uY3VycmVudFZhbHVlKTtcblx0XHRcdHJlZHJhdyA9IHRydWU7XG5cdFx0fVxuXHRcdGlmIChjaGFuZ2VzWydmaWx0ZXJTdGF0ZSddKSB7XG5cblx0XHRcdC8vIE9ubHkgZG8gYW55dGhpbmcgaWYgdGhlIGZpbHRlciBpcyBjaGFuZ2luZ1xuXHRcdFx0aWYgKGNoYW5nZXNbJ2ZpbHRlclN0YXRlJ10uaXNGaXJzdENoYW5nZSgpXG5cdFx0XHRcdHx8IHRoaXMuZGlkRmlsdGVyQ2hhbmdlKGNoYW5nZXNbJ2ZpbHRlclN0YXRlJ10uY3VycmVudFZhbHVlLCBjaGFuZ2VzWydmaWx0ZXJTdGF0ZSddLnByZXZpb3VzVmFsdWUpKSB7XG5cdFx0XHRcdHRoaXMuY2hhcnQuc2V0RmlsdGVyKGNoYW5nZXNbJ2ZpbHRlclN0YXRlJ10uY3VycmVudFZhbHVlKTtcblx0XHRcdFx0cmVkcmF3ID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdGlmIChjaGFuZ2VzWydtYXJrZXJzJ10pIHtcblx0XHRcdHRoaXMuY2hhcnQubWFya2VycyhjaGFuZ2VzWydtYXJrZXJzJ10uY3VycmVudFZhbHVlKTtcblx0XHRcdHJlZHJhdyA9IHRydWU7XG5cdFx0fVxuXG5cdFx0aWYgKHJlZHJhdykge1xuXHRcdFx0dGhpcy5jaGFydC5yZWRyYXcoKTtcblx0XHR9XG5cdH1cblxufVxuIl19
