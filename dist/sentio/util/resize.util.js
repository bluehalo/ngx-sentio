import { Observable } from 'rxjs';
import { select as d3_select } from 'd3-selection';
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
        this.chartElement = d3_select(el.nativeElement);
        this.chartElement.style('display', 'block');
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
    ResizeUtil.prototype.getComputedElementSize = function (element) {
        // Get the raw body element
        var body = document.body;
        // Cache the old overflow style
        var overflow = body.style.overflow;
        body.style.overflow = 'hidden';
        var cs = getComputedStyle(element);
        var width = ResizeUtil.parseFloat(cs.width, 0);
        var height = ResizeUtil.parseFloat(cs.height, 0);
        // Reapply the old overflow setting
        body.style.overflow = overflow;
        return { width: width, height: height };
    };
    /**
     * Gets the size context info for the current element
     * Two relevant things are computed:
     *
     * element size:
     *   Determines the chart size if the user has tried to specify the size on the directive
     *   - directive element size
     *
     * parent size:
     *   Used when resizing to fit parent. The size returned should be the size that the element should be.
     *   - directive parent size minus padding, margin, and border
     *
     *
     * @returns {ResizeDimension}
     */
    ResizeUtil.prototype.getSize = function () {
        var element = this.getComputedElementSize(this.chartElement.node());
        var parent = this.getComputedElementSize(this.chartElement.node().parentElement);
        return { element: element, parent: parent };
    };
    ResizeUtil.prototype.destroy = function () {
        this.resizeObserver.complete();
    };
    return ResizeUtil;
}());
export { ResizeUtil };
//# sourceMappingURL=resize.util.js.map