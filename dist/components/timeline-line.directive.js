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
        this.chart.dispatch().on('markerMouseover', function (p) { _this.markerOver.emit(p); });
        this.chart.dispatch().on('markerMouseout', function (p) { _this.markerOut.emit(p); });
        this.chart.dispatch().on('markerClick', function (p) { _this.markerClick.emit(p); });
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

//# sourceMappingURL=timeline-line.directive.js.map
