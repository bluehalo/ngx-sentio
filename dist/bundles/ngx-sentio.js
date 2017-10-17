/*! @asymmetrik/ngx-sentio - 5.0.0-alpha.1 - Copyright Asymmetrik, Ltd. 2007-2017 - All Rights Reserved. + */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@asymmetrik/sentio'), require('d3-selection'), require('rxjs')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@asymmetrik/sentio', 'd3-selection', 'rxjs'], factory) :
	(factory((global.ngxSentio = {}),global.ng.core,global.sentio,global.d3,global.Rx));
}(this, (function (exports,core,sentio,d3Selection,rxjs) { 'use strict';

/**
 * Wrapper for chart info
 */
var ChartWrapper = /** @class */ (function () {
    /**
     * Creates the chart, binds it to the dom element.
     * This doesn't do any DOM manipulation yet.
     * @param el
     * @param chart
     */
    function ChartWrapper(el, chart, chartReady) {
        this.chartElement = d3Selection.select(el.nativeElement);
        this.chart = chart;
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
var ResizeDimension = /** @class */ (function () {
    function ResizeDimension(width, height) {
        this.width = width;
        this.height = height;
    }
    return ResizeDimension;
}());
/**
 * Resize utility class
 */
var ResizeUtil = /** @class */ (function () {
    function ResizeUtil(el, enabled, debounce, sample) {
        if (enabled === void 0) { enabled = true; }
        if (debounce === void 0) { debounce = 200; }
        if (sample === void 0) { sample = 100; }
        var _this = this;
        this.enabled = enabled;
        this.chartElement = d3Selection.select(el.nativeElement);
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

var DonutChartDirective = /** @class */ (function () {
    function DonutChartDirective(el) {
        // Chart Ready event
        this.chartReady = new core.EventEmitter();
        // Create the chart
        this.chartWrapper = new ChartWrapper(el, sentio.chartDonut(), this.chartReady);
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
        if (changes['data']) {
            this.chartWrapper.chart.data(this.data);
            redraw = redraw || !changes['data'].isFirstChange();
        }
        if (changes['duration']) {
            this.chartWrapper.chart.duration(this.duration);
        }
        if (changes['colorScale']) {
            this.chartWrapper.chart.colorScale(this.colorScale);
            redraw = redraw || !changes['colorScale'].isFirstChange();
        }
        if (changes['resizeEnabled']) {
            this.resizeUtil.enabled = this.resizeEnabled;
            resize = resize || (this.resizeEnabled && !changes['resizeEnabled'].isFirstChange());
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
    DonutChartDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: 'sentioDonutChart'
                },] },
    ];
    /** @nocollapse */
    DonutChartDirective.ctorParameters = function () { return [
        { type: core.ElementRef, },
    ]; };
    DonutChartDirective.propDecorators = {
        'data': [{ type: core.Input, args: ['sentioData',] },],
        'colorScale': [{ type: core.Input, args: ['sentioColorScale',] },],
        'resizeEnabled': [{ type: core.Input, args: ['sentioResize',] },],
        'duration': [{ type: core.Input, args: ['sentioDuration',] },],
        'chartReady': [{ type: core.Output, args: ['sentioChartReady',] },],
        'onResize': [{ type: core.HostListener, args: ['window:resize', ['$event'],] },],
    };
    return DonutChartDirective;
}());

var MatrixChartDirective = /** @class */ (function () {
    function MatrixChartDirective(el) {
        // Chart Ready event
        this.chartReady = new core.EventEmitter();
        // Create the chart
        this.chartWrapper = new ChartWrapper(el, sentio.chartMatrix(), this.chartReady);
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
        if (changes['data']) {
            this.chartWrapper.chart.data(this.data);
            redraw = redraw || !changes['data'].isFirstChange();
        }
        if (changes['series']) {
            this.chartWrapper.chart.series(this.series);
            redraw = redraw || !changes['series'].isFirstChange();
        }
        if (changes['duration']) {
            this.chartWrapper.chart.duration(this.duration);
        }
        // Only redraw once if possible
        if (redraw) {
            this.chartWrapper.chart.redraw();
        }
    };
    MatrixChartDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: 'sentioMatrixChart'
                },] },
    ];
    /** @nocollapse */
    MatrixChartDirective.ctorParameters = function () { return [
        { type: core.ElementRef, },
    ]; };
    MatrixChartDirective.propDecorators = {
        'data': [{ type: core.Input, args: ['sentioData',] },],
        'series': [{ type: core.Input, args: ['sentioSeries',] },],
        'duration': [{ type: core.Input, args: ['sentioDuration',] },],
        'chartReady': [{ type: core.Output, args: ['sentioChartReady',] },],
    };
    return MatrixChartDirective;
}());

/**
 * Wrapper for common timeline stuff
 */
var TimelineUtil = /** @class */ (function () {
    /**
     * Creates the chart, binds it to the dom element.
     * This doesn't do any DOM manipulation yet.
     * @param el
     * @param chart
     */
    function TimelineUtil(chartWrapper) {
        /**
         * Did the state of the brush change?
         */
        this.didBrushChange = function (current, previous) {
            // Deep compare the brush
            if (current === previous ||
                (null != current && null != previous
                    && current[0] === previous[0]
                    && current[1] === previous[1])) {
                return false;
            }
            // We know it changed
            return true;
        };
        this.chartWrapper = chartWrapper;
    }
    TimelineUtil.prototype.setChartDimensions = function (dim, resizeWidth, resizeHeight, force) {
        if (force === void 0) { force = false; }
        var resize = false;
        if ((force || resizeWidth) && null != dim.width && this.chartWrapper.chart.width() !== dim.width) {
            // pin the height to the width
            this.chartWrapper.chart
                .width(dim.width);
            resize = true;
        }
        if ((force || resizeHeight) && null != dim.height && this.chartWrapper.chart.height() !== dim.height) {
            // pin the height to the width
            this.chartWrapper.chart
                .height(dim.height);
            resize = true;
        }
        if (resize) {
            this.chartWrapper.chart.resize();
        }
    };
    TimelineUtil.prototype.onChanges = function (changes) {
        var resize = false;
        var redraw = false;
        if (changes['data']) {
            this.chartWrapper.chart.data(changes['data'].currentValue);
            redraw = redraw || !changes['data'].isFirstChange();
        }
        if (changes['series']) {
            this.chartWrapper.chart.series(changes['series'].currentValue);
            redraw = redraw || !changes['series'].isFirstChange();
        }
        if (changes['markers']) {
            this.chartWrapper.chart.markers(changes['markers'].currentValue);
            redraw = redraw || !changes['markers'].isFirstChange();
        }
        if (changes['yExtent']) {
            this.chartWrapper.chart.yExtent().overrideValue(changes['yExtent'].currentValue);
            redraw = redraw || !changes['yExtent'].isFirstChange();
        }
        if (changes['xExtent']) {
            this.chartWrapper.chart.xExtent().overrideValue(changes['xExtent'].currentValue);
            redraw = redraw || !changes['xExtent'].isFirstChange();
        }
        if (changes['showGrid']) {
            this.chartWrapper.chart.showGrid(changes['showGrid'].currentValue);
            redraw = redraw || !changes['showGrid'].isFirstChange();
        }
        if (changes['showXGrid']) {
            this.chartWrapper.chart.showXGrid(changes['showXGrid'].currentValue);
            redraw = redraw || !changes['showXGrid'].isFirstChange();
        }
        if (changes['showYGrid']) {
            this.chartWrapper.chart.showYGrid(changes['showYGrid'].currentValue);
            redraw = redraw || !changes['showYGrid'].isFirstChange();
        }
        if (changes['pointEvents']) {
            this.chartWrapper.chart.pointEvents(changes['pointEvents'].currentValue);
            redraw = redraw || !changes['showYGrid'].isFirstChange();
        }
        if (changes['brushEnabled']) {
            this.chartWrapper.chart.brush(changes['brushEnabled'].currentValue);
            redraw = redraw || !changes['brushEnabled'].isFirstChange();
        }
        if (changes['brushState'] && !changes['brushState'].isFirstChange()) {
            // Only apply it if it actually changed
            if (this.didBrushChange(changes['brushState'].currentValue, changes['brushState'].previousValue)) {
                this.chartWrapper.chart.setBrush(changes['brushState'].currentValue);
                redraw = true;
            }
        }
        return { resize: resize, redraw: redraw };
    };
    return TimelineUtil;
}());

var RealtimeTimelineDirective = /** @class */ (function () {
    function RealtimeTimelineDirective(el) {
        // Chart Ready event
        this.chartReady = new core.EventEmitter();
        // Interaction events
        this.markerMouseover = new core.EventEmitter();
        this.markerMouseout = new core.EventEmitter();
        this.markerClick = new core.EventEmitter();
        // Create the chart
        this.chartWrapper = new ChartWrapper(el, sentio.chartRealtimeTimeline(), this.chartReady);
        // Set up the resizer
        this.resizeUtil = new ResizeUtil(el, (this.resizeHeight || this.resizeWidth));
        this.timelineUtil = new TimelineUtil(this.chartWrapper);
    }
    RealtimeTimelineDirective.prototype.onResize = function (event) {
        this.resizeUtil.resizeObserver.next(event);
    };
    RealtimeTimelineDirective.prototype.ngOnInit = function () {
        var _this = this;
        // Initialize the chart
        this.chartWrapper.initialize();
        // register for the marker events
        this.chartWrapper.chart.dispatch().on('markerClick', function (p) { _this.markerClick.emit(p); });
        this.chartWrapper.chart.dispatch().on('markerMouseover', function (p) { _this.markerMouseover.emit(p); });
        this.chartWrapper.chart.dispatch().on('markerMouseout', function (p) { _this.markerMouseout.emit(p); });
        // Set up the resize callback
        this.resizeUtil.resizeSource
            .subscribe(function () {
            // Do the resize operation
            _this.timelineUtil.setChartDimensions(_this.resizeUtil.getSize(), _this.resizeWidth, _this.resizeHeight);
            _this.chartWrapper.chart.redraw();
        });
        // Set the initial size of the chart
        this.timelineUtil.setChartDimensions(this.resizeUtil.getSize(), this.resizeWidth, this.resizeHeight, true);
        this.chartWrapper.chart.redraw();
    };
    RealtimeTimelineDirective.prototype.ngOnDestroy = function () {
        this.resizeUtil.destroy();
    };
    RealtimeTimelineDirective.prototype.ngOnChanges = function (changes) {
        var retVal = this.timelineUtil.onChanges(changes);
        if (changes['fps']) {
            this.chartWrapper.chart.fps(this.fps);
        }
        if (changes['delay']) {
            this.chartWrapper.chart.delay(this.delay);
            retVal.redraw = retVal.redraw || !changes['delay'].isFirstChange();
        }
        if (changes['interval']) {
            this.chartWrapper.chart.interval(this.interval);
            retVal.redraw = retVal.redraw || !changes['interval'].isFirstChange();
        }
        // Only redraw once if necessary
        if (retVal.resize) {
            this.chartWrapper.chart.resize();
        }
        if (retVal.redraw) {
            this.chartWrapper.chart.redraw();
        }
    };
    RealtimeTimelineDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: 'sentioRealtimeTimeline'
                },] },
    ];
    /** @nocollapse */
    RealtimeTimelineDirective.ctorParameters = function () { return [
        { type: core.ElementRef, },
    ]; };
    RealtimeTimelineDirective.propDecorators = {
        'data': [{ type: core.Input, args: ['sentioData',] },],
        'series': [{ type: core.Input, args: ['sentioSeries',] },],
        'markers': [{ type: core.Input, args: ['sentioMarkers',] },],
        'yExtent': [{ type: core.Input, args: ['sentioYExtent',] },],
        'xExtent': [{ type: core.Input, args: ['sentioXExtent',] },],
        'showGrid': [{ type: core.Input, args: ['sentioShowGrid',] },],
        'showXGrid': [{ type: core.Input, args: ['sentioShowXGrid',] },],
        'showYGrid': [{ type: core.Input, args: ['sentioShowYGrid',] },],
        'delay': [{ type: core.Input, args: ['sentioDelay',] },],
        'fps': [{ type: core.Input, args: ['sentioFps',] },],
        'interval': [{ type: core.Input, args: ['sentioInterval',] },],
        'resizeWidth': [{ type: core.Input, args: ['sentioResizeWidth',] },],
        'resizeHeight': [{ type: core.Input, args: ['sentioResizeHeight',] },],
        'chartReady': [{ type: core.Output, args: ['sentioChartReady',] },],
        'markerMouseover': [{ type: core.Output, args: ['sentioMarkerMouseover',] },],
        'markerMouseout': [{ type: core.Output, args: ['sentioMarkerMouseout',] },],
        'markerClick': [{ type: core.Output, args: ['sentioMarkerClick',] },],
        'onResize': [{ type: core.HostListener, args: ['window:resize', ['$event'],] },],
    };
    return RealtimeTimelineDirective;
}());

var TimelineDirective = /** @class */ (function () {
    function TimelineDirective(el) {
        // Chart Ready event
        this.chartReady = new core.EventEmitter();
        // Interaction events
        this.brush = new core.EventEmitter();
        this.pointMouseover = new core.EventEmitter();
        this.pointMouseout = new core.EventEmitter();
        this.pointClick = new core.EventEmitter();
        this.markerMouseover = new core.EventEmitter();
        this.markerMouseout = new core.EventEmitter();
        this.markerClick = new core.EventEmitter();
        // Create the chart
        this.chartWrapper = new ChartWrapper(el, sentio.chartTimeline(), this.chartReady);
        // Set up the resizer
        this.resizeUtil = new ResizeUtil(el, (this.resizeHeight || this.resizeWidth));
        this.timelineUtil = new TimelineUtil(this.chartWrapper);
    }
    TimelineDirective.prototype.onResize = function (event) {
        this.resizeUtil.resizeObserver.next(event);
    };
    TimelineDirective.prototype.ngOnInit = function () {
        var _this = this;
        // Initialize the chart
        this.chartWrapper.initialize();
        // register for the point events
        this.chartWrapper.chart.dispatch()
            .on('pointClick.internal', function (d) { return _this.pointClick.emit(d); })
            .on('pointMouseover.internal', function (d) { return _this.pointMouseover.emit(d); })
            .on('pointMouseout.internal', function (d) { return _this.pointMouseout.emit(d); });
        // register for the marker events
        this.chartWrapper.chart.dispatch()
            .on('markerClick.internal', function (d) { return _this.markerClick.emit(d); })
            .on('markerMouseover.internal', function (d) { return _this.markerMouseover.emit(d); })
            .on('markerMouseout.internal', function (d) { return _this.markerMouseout.emit(d); });
        // register for the brush end event
        this.chartWrapper.chart.dispatch()
            .on('brushEnd.internal', function (fs) {
            // If the brush actually changed, emit the event
            if (_this.timelineUtil.didBrushChange(fs, _this.brushState)) {
                setTimeout(function () { _this.brush.emit(fs); });
            }
        });
        // Set up the resize callback
        this.resizeUtil.resizeSource
            .subscribe(function () {
            // Do the resize operation
            _this.timelineUtil.setChartDimensions(_this.resizeUtil.getSize(), _this.resizeWidth, _this.resizeHeight);
            _this.chartWrapper.chart.redraw();
        });
        // Set the initial size of the chart
        this.timelineUtil.setChartDimensions(this.resizeUtil.getSize(), this.resizeWidth, this.resizeHeight, true);
        this.chartWrapper.chart.redraw();
        // Set the brush (if it exists)
        if (null != this.brushState) {
            this.chartWrapper.chart.setBrush(this.brushState);
        }
    };
    TimelineDirective.prototype.ngOnDestroy = function () {
        this.resizeUtil.destroy();
    };
    TimelineDirective.prototype.ngOnChanges = function (changes) {
        var retVal = this.timelineUtil.onChanges(changes);
        // Only redraw once if necessary
        if (retVal.resize) {
            this.chartWrapper.chart.resize();
        }
        if (retVal.redraw) {
            this.chartWrapper.chart.redraw();
        }
    };
    TimelineDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: 'sentioTimeline'
                },] },
    ];
    /** @nocollapse */
    TimelineDirective.ctorParameters = function () { return [
        { type: core.ElementRef, },
    ]; };
    TimelineDirective.propDecorators = {
        'data': [{ type: core.Input, args: ['sentioData',] },],
        'series': [{ type: core.Input, args: ['sentioSeries',] },],
        'markers': [{ type: core.Input, args: ['sentioMarkers',] },],
        'yExtent': [{ type: core.Input, args: ['sentioYExtent',] },],
        'xExtent': [{ type: core.Input, args: ['sentioXExtent',] },],
        'showGrid': [{ type: core.Input, args: ['sentioShowGrid',] },],
        'showXGrid': [{ type: core.Input, args: ['sentioShowXGrid',] },],
        'showYGrid': [{ type: core.Input, args: ['sentioShowYGrid',] },],
        'pointEvents': [{ type: core.Input, args: ['sentioPointEvents',] },],
        'resizeWidth': [{ type: core.Input, args: ['sentioResizeWidth',] },],
        'resizeHeight': [{ type: core.Input, args: ['sentioResizeHeight',] },],
        'chartReady': [{ type: core.Output, args: ['sentioChartReady',] },],
        'brushEnabled': [{ type: core.Input, args: ['sentioBrushEnabled',] },],
        'brushState': [{ type: core.Input, args: ['sentioBrush',] },],
        'brush': [{ type: core.Output, args: ['sentioBrushChange',] },],
        'pointMouseover': [{ type: core.Output, args: ['sentioPointMouseover',] },],
        'pointMouseout': [{ type: core.Output, args: ['sentioPointMouseout',] },],
        'pointClick': [{ type: core.Output, args: ['sentioPointClick',] },],
        'markerMouseover': [{ type: core.Output, args: ['sentioMarkerMouseover',] },],
        'markerMouseout': [{ type: core.Output, args: ['sentioMarkerMouseout',] },],
        'markerClick': [{ type: core.Output, args: ['sentioMarkerClick',] },],
        'onResize': [{ type: core.HostListener, args: ['window:resize', ['$event'],] },],
    };
    return TimelineDirective;
}());

var VerticalBarChartDirective = /** @class */ (function () {
    function VerticalBarChartDirective(el) {
        // Chart Ready event
        this.chartReady = new core.EventEmitter();
        // Create the chart
        this.chartWrapper = new ChartWrapper(el, sentio.chartVerticalBars(), this.chartReady);
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
        if (changes['data']) {
            this.chartWrapper.chart.data(this.data);
            redraw = redraw || !changes['data'].isFirstChange();
        }
        if (changes['widthExtent']) {
            this.chartWrapper.chart.widthExtent().overrideValue(this.widthExtent);
            redraw = redraw || !changes['widthExtent'].isFirstChange();
        }
        if (changes['resizeEnabled']) {
            this.resizeUtil.enabled = this.resizeEnabled;
            resize = resize || (this.resizeEnabled && !changes['resizeEnabled'].isFirstChange());
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
    VerticalBarChartDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: 'sentioVerticalBarChart'
                },] },
    ];
    /** @nocollapse */
    VerticalBarChartDirective.ctorParameters = function () { return [
        { type: core.ElementRef, },
    ]; };
    VerticalBarChartDirective.propDecorators = {
        'data': [{ type: core.Input, args: ['sentioData',] },],
        'widthExtent': [{ type: core.Input, args: ['sentioWidthExtent',] },],
        'resizeEnabled': [{ type: core.Input, args: ['sentioResize',] },],
        'duration': [{ type: core.Input, args: ['sentioDuration',] },],
        'chartReady': [{ type: core.Output, args: ['sentioChartReady',] },],
        'onResize': [{ type: core.HostListener, args: ['window:resize', ['$event'],] },],
    };
    return VerticalBarChartDirective;
}());

var AutoBrushTimelineDirective = /** @class */ (function () {
    function AutoBrushTimelineDirective(el) {
        // Chart Ready event
        this.chartReady = new core.EventEmitter();
        this.brushChange = new core.EventEmitter();
        // Extent State
        this.extentChange = new core.EventEmitter();
        // Create the chart
        this.chartWrapper = new ChartWrapper(el, sentio.chartAutoBrushTimeline(), this.chartReady);
        // Set up the resizer
        this.resizeUtil = new ResizeUtil(el, (this.resizeHeight || this.resizeWidth));
        this.timelineUtil = new TimelineUtil(this.chartWrapper);
    }
    AutoBrushTimelineDirective.prototype.onResize = function (event) {
        this.resizeUtil.resizeObserver.next(event);
    };
    AutoBrushTimelineDirective.prototype.ngOnInit = function () {
        var _this = this;
        // Initialize the chart
        this.chartWrapper.initialize();
        // register for the auto-brush events
        this.chartWrapper.chart.dispatch()
            .on('brushChange.internal', function (brush) {
            if (_this.timelineUtil.didBrushChange(brush, _this.brushState)) {
                setTimeout(function () { _this.brushChange.emit(brush); });
            }
        })
            .on('extentChange.internal', function (extent) { return _this.extentChange.emit(extent); });
        // Set up the resize callback
        this.resizeUtil.resizeSource
            .subscribe(function () {
            // Do the resize operation
            _this.timelineUtil.setChartDimensions(_this.resizeUtil.getSize(), _this.resizeWidth, _this.resizeHeight);
            _this.chartWrapper.chart.redraw();
        });
        // Set the initial size of the chart
        this.timelineUtil.setChartDimensions(this.resizeUtil.getSize(), this.resizeWidth, this.resizeHeight, true);
        this.chartWrapper.chart.redraw();
        // Set the brush (if it exists)
        if (null != this.brushState) {
            this.chartWrapper.chart.setBrush(this.brushState);
        }
    };
    AutoBrushTimelineDirective.prototype.ngOnDestroy = function () {
        this.resizeUtil.destroy();
    };
    AutoBrushTimelineDirective.prototype.ngOnChanges = function (changes) {
        var retVal = this.timelineUtil.onChanges(changes);
        // Only redraw once if necessary
        if (retVal.resize) {
            this.chartWrapper.chart.resize();
        }
        if (retVal.redraw) {
            this.chartWrapper.chart.redraw();
        }
    };
    AutoBrushTimelineDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: 'sentioAutoBrushTimeline'
                },] },
    ];
    /** @nocollapse */
    AutoBrushTimelineDirective.ctorParameters = function () { return [
        { type: core.ElementRef, },
    ]; };
    AutoBrushTimelineDirective.propDecorators = {
        'data': [{ type: core.Input, args: ['sentioData',] },],
        'series': [{ type: core.Input, args: ['sentioSeries',] },],
        'yExtent': [{ type: core.Input, args: ['sentioYExtent',] },],
        'resizeWidth': [{ type: core.Input, args: ['sentioResizeWidth',] },],
        'resizeHeight': [{ type: core.Input, args: ['sentioResizeHeight',] },],
        'edgeTrigger': [{ type: core.Input, args: ['sentioEdgeTrigger',] },],
        'zoomInTrigger': [{ type: core.Input, args: ['sentioZoomInTrigger',] },],
        'zoomOutTrigger': [{ type: core.Input, args: ['sentioZoomOutTrigger',] },],
        'zoomTarget': [{ type: core.Input, args: ['sentiozoomTarget',] },],
        'maxExtent': [{ type: core.Input, args: ['sentioMaxExtent',] },],
        'minExtent': [{ type: core.Input, args: ['sentioMinExtent',] },],
        'minBrush': [{ type: core.Input, args: ['sentioMinBrush',] },],
        'chartReady': [{ type: core.Output, args: ['sentioChartReady',] },],
        'brushState': [{ type: core.Input, args: ['sentioBrush',] },],
        'brushChange': [{ type: core.Output, args: ['sentioBrushChange',] },],
        'extentChange': [{ type: core.Output, args: ['sentioExtentChange',] },],
        'onResize': [{ type: core.HostListener, args: ['window:resize', ['$event'],] },],
    };
    return AutoBrushTimelineDirective;
}());

var SentioModule = /** @class */ (function () {
    function SentioModule() {
    }
    SentioModule.forRoot = function () {
        return { ngModule: SentioModule, providers: [] };
    };
    SentioModule.decorators = [
        { type: core.NgModule, args: [{
                    exports: [
                        AutoBrushTimelineDirective,
                        DonutChartDirective,
                        MatrixChartDirective,
                        RealtimeTimelineDirective,
                        TimelineDirective,
                        VerticalBarChartDirective,
                    ],
                    declarations: [
                        AutoBrushTimelineDirective,
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
    return SentioModule;
}());

exports.SentioModule = SentioModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-sentio.js.map
