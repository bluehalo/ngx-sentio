/*! @asymmetrik/angular2-sentio - 4.1.0 - Copyright Asymmetrik, Ltd. 2007-2017 - All Rights Reserved. + */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@asymmetrik/sentio'), require('d3'), require('rxjs')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@asymmetrik/sentio', 'd3', 'rxjs'], factory) :
	(factory((global.angular2Sentio = global.angular2Sentio || {}),global.ng.core,global.sentio,global.d3,global.Rx));
}(this, (function (exports,_angular_core,sentio,d3,rxjs) { 'use strict';

/**
 * Wrapper for chart info
 */
var ChartWrapper = (function () {
    /**
     * Creates the chart, binds it to the dom element.
     * This doesn't do any DOM manipulation yet.
     * @param el
     * @param chart
     */
    function ChartWrapper(el, chart$$1, chartReady) {
        this.chartElement = d3.select(el.nativeElement);
        this.chart = chart$$1;
        this.chartReady = chartReady;
    }
    /**
     * Initializes the chart, creating its DOM structure
     */
    ChartWrapper.prototype.initialize = function () {
        this.chart.init(this.chartElement);
        this.chartReady.emit(this.chart);
    };
    return ChartWrapper;
}());

/* tslint:disable:max-classes-per-file */
var ResizeDimension = (function () {
    function ResizeDimension(width, height) {
        this.width = width;
        this.height = height;
    }
    return ResizeDimension;
}());
/**
 * Resize utility class
 */
var ResizeUtil = (function () {
    function ResizeUtil(el, enabled, debounce, sample) {
        if (enabled === void 0) { enabled = true; }
        if (debounce === void 0) { debounce = 200; }
        if (sample === void 0) { sample = 100; }
        var _this = this;
        this.enabled = enabled;
        this.chartElement = d3.select(el.nativeElement);
        // Create a hot observable for resize events
        this.resizeSource = rxjs.Observable
            .create(function (observer) {
            _this.resizeObserver = observer;
        })
            .publish()
            .refCount()
            .filter(function () { return _this.enabled; });
        if (null != debounce) {
            this.resizeSource = this.resizeSource.debounceTime(debounce);
        }
        if (null != sample) {
            this.resizeSource = this.resizeSource.sample(rxjs.Observable.interval(sample));
        }
        this.resizeSource = this.resizeSource.map(function () { return _this.getSize(); });
    }
    ResizeUtil.parseFloat = function (value, defaultValue) {
        var toReturn = parseFloat(value);
        return ((isNaN(toReturn)) ? defaultValue : toReturn);
    };
    /**
     * Determines the numerical dimension given a string representation
     * Assumes the string is in the form 'NNNNNpx', more specifically
     * an arbitrarily long sequence of digits terminated by 'px'
     *
     * @param dimStr A string representation of the pixel size
     * @returns {number} the numerical representation of the pixel size
     */
    ResizeUtil.getPixelDimension = function (dimStr) {
        var dim;
        if (null != dimStr && '' !== dimStr) {
            dim = parseFloat(dimStr.substring(0, dimStr.length - 2));
            if (null == dim || isNaN(dim)) {
                dim = undefined;
            }
        }
        return dim;
    };
    /**
     * Returns the size of the element (only returns height/width if they are specified on the DOM elements)
     * Checks attributes and style
     *
     * @param element
     * @returns {ResizeDimension}
     */
    ResizeUtil.getSpecifiedSize = function (element) {
        var width = element.attributes.width || ResizeUtil.getPixelDimension(element.style.width);
        var height = element.attributes.height || ResizeUtil.getPixelDimension(element.style.height);
        return new ResizeDimension(width, height);
    };
    /**
     * Returns the size of the element
     * Checks client size
     *
     * @param element
     * @returns {ResizeDimension}
     */
    ResizeUtil.getActualSize = function (element) {
        var cs = getComputedStyle(element);
        var paddingX = ResizeUtil.parseFloat(cs.paddingLeft, 0) + ResizeUtil.parseFloat(cs.paddingRight, 0);
        var paddingY = ResizeUtil.parseFloat(cs.paddingTop, 0) + ResizeUtil.parseFloat(cs.paddingBottom, 0);
        var borderX = ResizeUtil.parseFloat(cs.borderLeftWidth, 0) + ResizeUtil.parseFloat(cs.borderRightWidth, 0);
        var borderY = ResizeUtil.parseFloat(cs.borderTopWidth, 0) + ResizeUtil.parseFloat(cs.borderBottomWidth, 0);
        // Element width and height minus padding and border
        var width = element.offsetWidth - paddingX - borderX;
        var height = element.offsetHeight - paddingY - borderY;
        return new ResizeDimension(width, height);
    };
    /**
     * Gets the specified dimensions of the element
     * @returns {ResizeDimension}
     */
    ResizeUtil.prototype.getSpecifiedSize = function () {
        return ResizeUtil.getSpecifiedSize(this.chartElement.node());
    };
    /**
     * Get the element size (with no overflow)
     * @returns {ResizeDimension}
     */
    ResizeUtil.prototype.getActualSize = function () {
        // Get the raw body element
        var body = document.body;
        // Cache the old overflow style
        var overflow = body.style.overflow;
        body.style.overflow = 'hidden';
        // The first element child of our selector should be the <div> we injected
        var rawElement = this.chartElement.node().parentElement;
        var size = ResizeUtil.getActualSize(rawElement);
        // Reapply the old overflow setting
        body.style.overflow = overflow;
        return size;
    };
    /**
     * Gets the size of the element (this is the actual size overridden by specified size)
     * Actual size should be based on the size of the parent
     *
     * @returns {ResizeDimension}
     */
    ResizeUtil.prototype.getSize = function () {
        var specifiedSize = this.getSpecifiedSize();
        var size = this.getActualSize();
        if (null != specifiedSize.height) {
            size.height = specifiedSize.height;
        }
        if (null != specifiedSize.width) {
            size.width = specifiedSize.width;
        }
        return size;
    };
    ResizeUtil.prototype.destroy = function () {
        this.resizeObserver.complete();
    };
    return ResizeUtil;
}());

var DonutChartDirective = (function () {
    function DonutChartDirective(el) {
        // Chart Ready event
        this.chartReady = new _angular_core.EventEmitter();
        // Create the chart
        this.chartWrapper = new ChartWrapper(el, sentio.chart.donut(), this.chartReady);
        // Set up the resizer
        this.resizeUtil = new ResizeUtil(el, this.resizeEnabled);
    }
    /**
     * For the donut chart, we pin the height to the width
     * to keep the aspect ratio correct
     */
    DonutChartDirective.prototype.setChartDimensions = function (dim, force) {
        if (force === void 0) { force = false; }
        if ((force || this.resizeEnabled) && null != dim.width && this.chartWrapper.chart.width() !== dim.width) {
            // pin the height to the width
            this.chartWrapper.chart
                .width(dim.width)
                .height(dim.width)
                .resize();
        }
    };
    DonutChartDirective.prototype.onResize = function (event) {
        this.resizeUtil.resizeObserver.next(event);
    };
    DonutChartDirective.prototype.ngOnInit = function () {
        var _this = this;
        // Initialize the chart
        this.chartWrapper.initialize();
        // Set up the resize callback
        this.resizeUtil.resizeSource
            .subscribe(function () {
            // Do the resize operation
            _this.setChartDimensions(_this.resizeUtil.getSize());
            _this.chartWrapper.chart.redraw();
        });
        // Set the initial size of the chart
        this.setChartDimensions(this.resizeUtil.getSize(), true);
        this.chartWrapper.chart.redraw();
    };
    DonutChartDirective.prototype.ngOnDestroy = function () {
        this.resizeUtil.destroy();
    };
    DonutChartDirective.prototype.ngOnChanges = function (changes) {
        var resize = false;
        var redraw = false;
        if (changes['model']) {
            this.chartWrapper.chart.data(this.model);
            redraw = redraw || !changes['model'].isFirstChange();
        }
        if (changes['duration']) {
            this.chartWrapper.chart.duration(this.duration);
        }
        if (changes['colorScale']) {
            this.chartWrapper.chart.colorScale(this.colorScale);
            redraw = redraw || !changes['colorScale'].isFirstChange();
        }
        if (changes['resize']) {
            this.resizeUtil.enabled = this.resizeEnabled;
            resize = resize || (this.resizeEnabled && !changes['resize'].isFirstChange());
            redraw = redraw || resize;
        }
        // Only redraw once if necessary
        if (resize) {
            this.chartWrapper.chart.resize();
        }
        if (redraw) {
            this.chartWrapper.chart.redraw();
        }
    };
    return DonutChartDirective;
}());
DonutChartDirective.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: 'sentioDonutChart'
            },] },
];
/** @nocollapse */
DonutChartDirective.ctorParameters = function () { return [
    { type: _angular_core.ElementRef, },
]; };
DonutChartDirective.propDecorators = {
    'model': [{ type: _angular_core.Input },],
    'colorScale': [{ type: _angular_core.Input },],
    'resizeEnabled': [{ type: _angular_core.Input, args: ['resize',] },],
    'duration': [{ type: _angular_core.Input },],
    'chartReady': [{ type: _angular_core.Output },],
    'onResize': [{ type: _angular_core.HostListener, args: ['window:resize', ['$event'],] },],
};

var MatrixChartDirective = (function () {
    function MatrixChartDirective(el) {
        // Chart Ready event
        this.chartReady = new _angular_core.EventEmitter();
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
MatrixChartDirective.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: 'sentioMatrixChart'
            },] },
];
/** @nocollapse */
MatrixChartDirective.ctorParameters = function () { return [
    { type: _angular_core.ElementRef, },
]; };
MatrixChartDirective.propDecorators = {
    'model': [{ type: _angular_core.Input },],
    'duration': [{ type: _angular_core.Input },],
    'chartReady': [{ type: _angular_core.Output },],
};

var RealtimeTimelineDirective = (function () {
    function RealtimeTimelineDirective(el) {
        // Chart Ready event
        this.chartReady = new _angular_core.EventEmitter();
        // Interaction events
        this.markerOver = new _angular_core.EventEmitter();
        this.markerOut = new _angular_core.EventEmitter();
        this.markerClick = new _angular_core.EventEmitter();
        // Create the chart
        this.chartWrapper = new ChartWrapper(el, sentio.chart.realtimeTimeline(), this.chartReady);
        // Set up the resizer
        this.resizeUtil = new ResizeUtil(el, (this.resizeHeight || this.resizeWidth));
    }
    /**
     * For the timeline, both dimensions scale independently
     */
    RealtimeTimelineDirective.prototype.setChartDimensions = function (dim, force) {
        if (force === void 0) { force = false; }
        var resize = false;
        if ((force || this.resizeWidth) && null != dim.width && this.chartWrapper.chart.width() !== dim.width) {
            // pin the height to the width
            this.chartWrapper.chart
                .width(dim.width);
            resize = true;
        }
        if ((force || this.resizeHeight) && null != dim.height && this.chartWrapper.chart.height() !== dim.height) {
            // pin the height to the width
            this.chartWrapper.chart
                .height(dim.height);
            resize = true;
        }
        if (resize) {
            this.chartWrapper.chart.resize();
        }
    };
    RealtimeTimelineDirective.prototype.onResize = function (event) {
        this.resizeUtil.resizeObserver.next(event);
    };
    RealtimeTimelineDirective.prototype.ngOnInit = function () {
        var _this = this;
        // Initialize the chart
        this.chartWrapper.initialize();
        // register for the marker events
        this.chartWrapper.chart.dispatch().on('markerClick', function (p) { _this.markerClick.emit(p); });
        this.chartWrapper.chart.dispatch().on('markerMouseover', function (p) { _this.markerOver.emit(p); });
        this.chartWrapper.chart.dispatch().on('markerMouseout', function (p) { _this.markerOut.emit(p); });
        // Set up the resize callback
        this.resizeUtil.resizeSource
            .subscribe(function () {
            // Do the resize operation
            _this.setChartDimensions(_this.resizeUtil.getSize());
            _this.chartWrapper.chart.redraw();
        });
        // Set the initial size of the chart
        this.setChartDimensions(this.resizeUtil.getSize(), true);
        this.chartWrapper.chart.redraw();
    };
    RealtimeTimelineDirective.prototype.ngOnDestroy = function () {
        this.resizeUtil.destroy();
    };
    RealtimeTimelineDirective.prototype.ngOnChanges = function (changes) {
        var resize = false;
        var redraw = false;
        if (changes['model']) {
            this.chartWrapper.chart.data(this.model);
            redraw = redraw || !changes['model'].isFirstChange();
        }
        if (changes['markers']) {
            this.chartWrapper.chart.markers(this.markers);
            redraw = redraw || !changes['markers'].isFirstChange();
        }
        if (changes['yExtent']) {
            this.chartWrapper.chart.yExtent().overrideValue(this.yExtent);
            redraw = redraw || !changes['yExtent'].isFirstChange();
        }
        if (changes['xExtent']) {
            this.chartWrapper.chart.xExtent().overrideValue(this.xExtent);
            redraw = redraw || !changes['xExtent'].isFirstChange();
        }
        if (changes['fps']) {
            this.chartWrapper.chart.fps(this.fps);
        }
        if (changes['delay']) {
            this.chartWrapper.chart.delay(this.delay);
            redraw = redraw || !changes['delay'].isFirstChange();
        }
        if (changes['interval']) {
            this.chartWrapper.chart.interval(this.interval);
            redraw = redraw || !changes['interval'].isFirstChange();
        }
        // Only redraw once if necessary
        if (resize) {
            this.chartWrapper.chart.resize();
        }
        if (redraw) {
            this.chartWrapper.chart.redraw();
        }
    };
    return RealtimeTimelineDirective;
}());
RealtimeTimelineDirective.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: 'sentioRealtimeTimeline'
            },] },
];
/** @nocollapse */
RealtimeTimelineDirective.ctorParameters = function () { return [
    { type: _angular_core.ElementRef, },
]; };
RealtimeTimelineDirective.propDecorators = {
    'model': [{ type: _angular_core.Input },],
    'markers': [{ type: _angular_core.Input },],
    'yExtent': [{ type: _angular_core.Input },],
    'xExtent': [{ type: _angular_core.Input },],
    'delay': [{ type: _angular_core.Input },],
    'fps': [{ type: _angular_core.Input },],
    'interval': [{ type: _angular_core.Input },],
    'resizeWidth': [{ type: _angular_core.Input },],
    'resizeHeight': [{ type: _angular_core.Input },],
    'chartReady': [{ type: _angular_core.Output },],
    'markerOver': [{ type: _angular_core.Output },],
    'markerOut': [{ type: _angular_core.Output },],
    'markerClick': [{ type: _angular_core.Output },],
    'onResize': [{ type: _angular_core.HostListener, args: ['window:resize', ['$event'],] },],
};

var TimelineDirective = (function () {
    function TimelineDirective(el) {
        // Chart Ready event
        this.chartReady = new _angular_core.EventEmitter();
        this.filterChange = new _angular_core.EventEmitter();
        // Interaction events
        this.markerOver = new _angular_core.EventEmitter();
        this.markerOut = new _angular_core.EventEmitter();
        this.markerClick = new _angular_core.EventEmitter();
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
        // Create the chart
        this.chartWrapper = new ChartWrapper(el, sentio.chart.timeline(), this.chartReady);
        // Set up the resizer
        this.resizeUtil = new ResizeUtil(el, (this.resizeHeight || this.resizeWidth));
    }
    /**
     * For the timeline, both dimensions scale independently
     */
    TimelineDirective.prototype.setChartDimensions = function (dim, force) {
        if (force === void 0) { force = false; }
        var resize = false;
        if ((force || this.resizeWidth) && null != dim.width && this.chartWrapper.chart.width() !== dim.width) {
            // pin the height to the width
            this.chartWrapper.chart
                .width(dim.width);
            resize = true;
        }
        if ((force || this.resizeHeight) && null != dim.height && this.chartWrapper.chart.height() !== dim.height) {
            // pin the height to the width
            this.chartWrapper.chart
                .height(dim.height);
            resize = true;
        }
        if (resize) {
            this.chartWrapper.chart.resize();
        }
    };
    TimelineDirective.prototype.onResize = function (event) {
        this.resizeUtil.resizeObserver.next(event);
    };
    TimelineDirective.prototype.ngOnInit = function () {
        var _this = this;
        // Initialize the chart
        this.chartWrapper.initialize();
        // register for the marker events
        this.chartWrapper.chart.dispatch().on('markerClick', function (p) { _this.markerClick.emit(p); });
        this.chartWrapper.chart.dispatch().on('markerMouseover', function (p) { _this.markerOver.emit(p); });
        this.chartWrapper.chart.dispatch().on('markerMouseout', function (p) { _this.markerOut.emit(p); });
        // register for the filter end event
        this.chartWrapper.chart.dispatch().on('filterend', function (fs) {
            // If the filter actually changed, emit the event
            if (_this.didFilterChange(fs, _this.filterState)) {
                setTimeout(function () { _this.filterChange.emit(fs); });
            }
        });
        // Set up the resize callback
        this.resizeUtil.resizeSource
            .subscribe(function () {
            // Do the resize operation
            _this.setChartDimensions(_this.resizeUtil.getSize());
            _this.chartWrapper.chart.redraw();
        });
        // Set the initial size of the chart
        this.setChartDimensions(this.resizeUtil.getSize(), true);
        this.chartWrapper.chart.redraw();
        // Set the filter (if it exists)
        if (null != this.filterState) {
            this.chartWrapper.chart.setFilter(this.filterState);
        }
    };
    TimelineDirective.prototype.ngOnDestroy = function () {
        this.resizeUtil.destroy();
    };
    TimelineDirective.prototype.ngOnChanges = function (changes) {
        var resize = false;
        var redraw = false;
        if (changes['model']) {
            this.chartWrapper.chart.data(this.model);
            redraw = redraw || !changes['model'].isFirstChange();
        }
        if (changes['markers']) {
            this.chartWrapper.chart.markers(this.markers);
            redraw = redraw || !changes['markers'].isFirstChange();
        }
        if (changes['yExtent']) {
            this.chartWrapper.chart.yExtent().overrideValue(this.yExtent);
            redraw = redraw || !changes['yExtent'].isFirstChange();
        }
        if (changes['xExtent']) {
            this.chartWrapper.chart.xExtent().overrideValue(this.xExtent);
            redraw = redraw || !changes['xExtent'].isFirstChange();
        }
        if (changes['filterEnabled']) {
            this.chartWrapper.chart.filter(this.filterEnabled);
            redraw = redraw || !changes['filterEnabled'].isFirstChange();
        }
        if (changes['filterState'] && !changes['filterState'].isFirstChange()) {
            // Only apply it if it actually changed
            if (this.didFilterChange(changes['filterState'].currentValue, changes['filterState'].previousValue)) {
                this.chartWrapper.chart.setFilter(this.filterState);
                redraw = true;
            }
        }
        // Only redraw once if necessary
        if (resize) {
            this.chartWrapper.chart.resize();
        }
        if (redraw) {
            this.chartWrapper.chart.redraw();
        }
    };
    return TimelineDirective;
}());
TimelineDirective.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: 'sentioTimeline'
            },] },
];
/** @nocollapse */
TimelineDirective.ctorParameters = function () { return [
    { type: _angular_core.ElementRef, },
]; };
TimelineDirective.propDecorators = {
    'model': [{ type: _angular_core.Input },],
    'markers': [{ type: _angular_core.Input },],
    'yExtent': [{ type: _angular_core.Input },],
    'xExtent': [{ type: _angular_core.Input },],
    'resizeWidth': [{ type: _angular_core.Input },],
    'resizeHeight': [{ type: _angular_core.Input },],
    'chartReady': [{ type: _angular_core.Output },],
    'filterEnabled': [{ type: _angular_core.Input },],
    'filterState': [{ type: _angular_core.Input, args: ['filter',] },],
    'filterChange': [{ type: _angular_core.Output },],
    'markerOver': [{ type: _angular_core.Output },],
    'markerOut': [{ type: _angular_core.Output },],
    'markerClick': [{ type: _angular_core.Output },],
    'onResize': [{ type: _angular_core.HostListener, args: ['window:resize', ['$event'],] },],
};

var VerticalBarChartDirective = (function () {
    function VerticalBarChartDirective(el) {
        // Chart Ready event
        this.chartReady = new _angular_core.EventEmitter();
        // Create the chart
        this.chartWrapper = new ChartWrapper(el, sentio.chart.verticalBars(), this.chartReady);
        // Set up the resizer
        this.resizeUtil = new ResizeUtil(el, this.resizeEnabled);
    }
    /**
     * For The vertical bar chart, we just resize width
     */
    VerticalBarChartDirective.prototype.setChartDimensions = function (dim, force) {
        if (force === void 0) { force = false; }
        if ((force || this.resizeEnabled) && null != dim.width && this.chartWrapper.chart.width() !== dim.width) {
            // pin the height to the width
            this.chartWrapper.chart
                .width(dim.width)
                .resize();
        }
    };
    VerticalBarChartDirective.prototype.onResize = function (event) {
        this.resizeUtil.resizeObserver.next(event);
    };
    VerticalBarChartDirective.prototype.ngOnInit = function () {
        var _this = this;
        // Initialize the chart
        this.chartWrapper.initialize();
        // Set up the resize callback
        this.resizeUtil.resizeSource
            .subscribe(function () {
            // Do the resize operation
            _this.setChartDimensions(_this.resizeUtil.getSize());
            _this.chartWrapper.chart.redraw();
        });
        // Set the initial size of the chart
        this.setChartDimensions(this.resizeUtil.getSize(), true);
        this.chartWrapper.chart.redraw();
    };
    VerticalBarChartDirective.prototype.ngOnDestroy = function () {
        this.resizeUtil.destroy();
    };
    VerticalBarChartDirective.prototype.ngOnChanges = function (changes) {
        var resize = false;
        var redraw = false;
        if (changes['model']) {
            this.chartWrapper.chart.data(this.model);
            redraw = redraw || !changes['model'].isFirstChange();
        }
        if (changes['widthExtent']) {
            this.chartWrapper.chart.widthExtent().overrideValue(this.widthExtent);
            redraw = redraw || !changes['widthExtent'].isFirstChange();
        }
        if (changes['resize']) {
            this.resizeUtil.enabled = this.resizeEnabled;
            resize = resize || (this.resizeEnabled && !changes['resize'].isFirstChange());
            redraw = redraw || resize;
        }
        // Only redraw once if necessary
        if (resize) {
            this.chartWrapper.chart.resize();
        }
        if (redraw) {
            this.chartWrapper.chart.redraw();
        }
    };
    return VerticalBarChartDirective;
}());
VerticalBarChartDirective.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: 'sentioVerticalBarChart'
            },] },
];
/** @nocollapse */
VerticalBarChartDirective.ctorParameters = function () { return [
    { type: _angular_core.ElementRef, },
]; };
VerticalBarChartDirective.propDecorators = {
    'model': [{ type: _angular_core.Input },],
    'widthExtent': [{ type: _angular_core.Input },],
    'resizeEnabled': [{ type: _angular_core.Input, args: ['resize',] },],
    'duration': [{ type: _angular_core.Input },],
    'chartReady': [{ type: _angular_core.Output },],
    'onResize': [{ type: _angular_core.HostListener, args: ['window:resize', ['$event'],] },],
};

var SentioModule = (function () {
    function SentioModule() {
    }
    SentioModule.forRoot = function () {
        return { ngModule: SentioModule, providers: [] };
    };
    return SentioModule;
}());
SentioModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                exports: [
                    DonutChartDirective,
                    MatrixChartDirective,
                    RealtimeTimelineDirective,
                    TimelineDirective,
                    VerticalBarChartDirective
                ],
                declarations: [
                    DonutChartDirective,
                    MatrixChartDirective,
                    RealtimeTimelineDirective,
                    TimelineDirective,
                    VerticalBarChartDirective
                ]
            },] },
];
/** @nocollapse */
SentioModule.ctorParameters = function () { return []; };

exports.SentioModule = SentioModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular2-sentio.js.map
