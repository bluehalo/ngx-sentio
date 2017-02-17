import { Observable } from 'rxjs';
import * as d3 from 'd3';
/* tslint:disable:max-classes-per-file */
var ResizeDimension = (function () {
    function ResizeDimension(width, height) {
        this.width = width;
        this.height = height;
    }
    return ResizeDimension;
}());
export { ResizeDimension };
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
        this.resizeSource = Observable
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
            this.resizeSource = this.resizeSource.sample(Observable.interval(sample));
        }
        this.resizeSource = this.resizeSource.map(function () { return _this.getSize(); });
    }
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
        var paddingX = 0;
        var paddingY = 0;
        var borderX = 0;
        var borderY = 0;
        try {
            paddingX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
        }
        catch (e) { }
        try {
            paddingY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
        }
        catch (e) { }
        try {
            borderX = parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);
        }
        catch (e) { }
        try {
            borderY = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);
        }
        catch (e) { }
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
export { ResizeUtil };

//# sourceMappingURL=resize.util.js.map
