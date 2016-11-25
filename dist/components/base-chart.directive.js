"use strict";
var d3 = require('d3');
/**
 * Base Directive Object for all charts
 */
var BaseChartDirective = (function () {
    function BaseChartDirective(el, chart) {
        this.chartElement = d3.select(el.nativeElement);
        this.chart = chart;
        this.chart.init(this.chartElement);
        // Extract the dimensions of the chart
        var width = this.getPixelDimension(this.chartElement[0][0].style.width);
        var height = this.getPixelDimension(this.chartElement[0][0].style.height);
        this.setChartDimensions(width, height, true);
    }
    /**
     * Determines the numerical dimension given a string representation
     * Assumes the string is in the form 'NNNNNpx', more specifically
     * an arbitrarily long sequence of digits terminated by 'px'
     *
     * @param dimStr A string representation of the pixel size
     * @returns {number} the numerical representation of the pixel size
     */
    BaseChartDirective.prototype.getPixelDimension = function (dimStr) {
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
     * Resize the component
     */
    BaseChartDirective.prototype.resize = function () {
        // Get the raw body element
        var body = document.body;
        // Cache the old overflow style
        var overflow = body.style.overflow;
        body.style.overflow = 'hidden';
        // The first element child of our selector should be the <div> we injected
        var rawElement = this.chartElement[0][0].firstElementChild;
        // Derive size of the parent (there are several ways to do this depending on the parent)
        var width = rawElement.attributes.width || rawElement.style.width || rawElement.clientWidth;
        var height = rawElement.attributes.height || rawElement.style.height || rawElement.clientHeight;
        // Reapply the old overflow setting
        body.style.overflow = overflow;
        this.setChartDimensions(width, height, false);
    };
    /**
     * Manage a delayed resize of the component
     */
    BaseChartDirective.prototype.delayResize = function () {
        var _this = this;
        if (null != this.resizeTimer) {
            clearTimeout(this.resizeTimer);
        }
        this.resizeTimer = setTimeout(function () { return _this.resize(); }, 200);
    };
    return BaseChartDirective;
}());
exports.BaseChartDirective = BaseChartDirective;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYmFzZS1jaGFydC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLElBQVksRUFBRSxXQUFNLElBQUksQ0FBQyxDQUFBO0FBRXpCOztHQUVHO0FBQ0g7SUFLQyw0QkFBWSxFQUFjLEVBQUUsS0FBVTtRQUNyQyxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBRW5CLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVuQyxzQ0FBc0M7UUFDdEMsSUFBSSxLQUFLLEdBQVcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hGLElBQUksTUFBTSxHQUFXLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsRixJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBWUQ7Ozs7Ozs7T0FPRztJQUNILDhDQUFpQixHQUFqQixVQUFrQixNQUFjO1FBQy9CLElBQUksR0FBVyxDQUFDO1FBRWhCLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxNQUFNLElBQUksRUFBRSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDckMsR0FBRyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekQsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixHQUFHLEdBQUcsU0FBUyxDQUFDO1lBQ2pCLENBQUM7UUFDRixDQUFDO1FBRUQsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNaLENBQUM7SUFFRDs7T0FFRztJQUNILG1DQUFNLEdBQU47UUFDQywyQkFBMkI7UUFDM0IsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztRQUV6QiwrQkFBK0I7UUFDL0IsSUFBSSxRQUFRLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7UUFDM0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBRS9CLDBFQUEwRTtRQUMxRSxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO1FBRTNELHdGQUF3RjtRQUN4RixJQUFJLEtBQUssR0FBVyxVQUFVLENBQUMsVUFBVSxDQUFDLEtBQUssSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxVQUFVLENBQUMsV0FBVyxDQUFDO1FBQ3BHLElBQUksTUFBTSxHQUFXLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLFVBQVUsQ0FBQyxZQUFZLENBQUM7UUFFeEcsbUNBQW1DO1FBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUUvQixJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCx3Q0FBVyxHQUFYO1FBQUEsaUJBS0M7UUFKQSxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDOUIsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxNQUFNLEVBQUUsRUFBYixDQUFhLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUNGLHlCQUFDO0FBQUQsQ0FqRkEsQUFpRkMsSUFBQTtBQWpGcUIsMEJBQWtCLHFCQWlGdkMsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL2Jhc2UtY2hhcnQuZGlyZWN0aXZlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnZDMnO1xuXG4vKipcbiAqIEJhc2UgRGlyZWN0aXZlIE9iamVjdCBmb3IgYWxsIGNoYXJ0c1xuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZUNoYXJ0RGlyZWN0aXZlIHtcblx0Y2hhcnQ6IGFueTtcblx0Y2hhcnRFbGVtZW50OiBhbnk7XG5cdHJlc2l6ZVRpbWVyOiBudW1iZXI7XG5cblx0Y29uc3RydWN0b3IoZWw6IEVsZW1lbnRSZWYsIGNoYXJ0OiBhbnkpIHtcblx0XHR0aGlzLmNoYXJ0RWxlbWVudCA9IGQzLnNlbGVjdChlbC5uYXRpdmVFbGVtZW50KTtcblx0XHR0aGlzLmNoYXJ0ID0gY2hhcnQ7XG5cblx0XHR0aGlzLmNoYXJ0LmluaXQodGhpcy5jaGFydEVsZW1lbnQpO1xuXG5cdFx0Ly8gRXh0cmFjdCB0aGUgZGltZW5zaW9ucyBvZiB0aGUgY2hhcnRcblx0XHRsZXQgd2lkdGg6IG51bWJlciA9IHRoaXMuZ2V0UGl4ZWxEaW1lbnNpb24odGhpcy5jaGFydEVsZW1lbnRbMF1bMF0uc3R5bGUud2lkdGgpO1xuXHRcdGxldCBoZWlnaHQ6IG51bWJlciA9IHRoaXMuZ2V0UGl4ZWxEaW1lbnNpb24odGhpcy5jaGFydEVsZW1lbnRbMF1bMF0uc3R5bGUuaGVpZ2h0KTtcblx0XHR0aGlzLnNldENoYXJ0RGltZW5zaW9ucyh3aWR0aCwgaGVpZ2h0LCB0cnVlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgdGhlIGNoYXJ0IGRpbWVuc2lvbnMgYWNjb3JkaW5nIHRvIHRoZSBpbXBsZW1lbnRhdGlvblxuXHQgKiBiZWhhdmlvciwgdGhlIGNvbmZpZ3VyYXRpb24sIGFuZCB0aGUgcGFyYW1ldGVycy5cblx0ICpcblx0ICogQHBhcmFtIHdpZHRoIFdpZHRoIHRvIHdoaWNoIHRvIG9wdGlvbmFsbHkgcmVzaXplIGluIHBpeGVsc1xuXHQgKiBAcGFyYW0gaGVpZ2h0IEhlaWdodCB0byB3aGljaCB0byBvcHRpb25hbGx5IHJlc2l6ZSBpbiBwaXhlbHNcblx0ICogQHBhcmFtIGZvcmNlIFNob3VsZCB0aGUgcmVzaXplIGlnbm9yZSB0aGUgcmVzaXplIGNvbmZpZ3VyYXRpb24/IChvcHRpb25hbCwgc2hvdWxkIGRlZmF1bHQgdG8gZmFsc2UpXG5cdCAqL1xuXHRhYnN0cmFjdCBzZXRDaGFydERpbWVuc2lvbnMod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGZvcmNlPzogYm9vbGVhbik6IHZvaWQ7XG5cblx0LyoqXG5cdCAqIERldGVybWluZXMgdGhlIG51bWVyaWNhbCBkaW1lbnNpb24gZ2l2ZW4gYSBzdHJpbmcgcmVwcmVzZW50YXRpb25cblx0ICogQXNzdW1lcyB0aGUgc3RyaW5nIGlzIGluIHRoZSBmb3JtICdOTk5OTnB4JywgbW9yZSBzcGVjaWZpY2FsbHlcblx0ICogYW4gYXJiaXRyYXJpbHkgbG9uZyBzZXF1ZW5jZSBvZiBkaWdpdHMgdGVybWluYXRlZCBieSAncHgnXG5cdCAqXG5cdCAqIEBwYXJhbSBkaW1TdHIgQSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHBpeGVsIHNpemVcblx0ICogQHJldHVybnMge251bWJlcn0gdGhlIG51bWVyaWNhbCByZXByZXNlbnRhdGlvbiBvZiB0aGUgcGl4ZWwgc2l6ZVxuXHQgKi9cblx0Z2V0UGl4ZWxEaW1lbnNpb24oZGltU3RyOiBzdHJpbmcpOiBudW1iZXIge1xuXHRcdGxldCBkaW06IG51bWJlcjtcblxuXHRcdGlmIChudWxsICE9IGRpbVN0ciAmJiAnJyAhPT0gZGltU3RyKSB7XG5cdFx0XHRkaW0gPSBwYXJzZUZsb2F0KGRpbVN0ci5zdWJzdHJpbmcoMCwgZGltU3RyLmxlbmd0aCAtIDIpKTtcblx0XHRcdGlmIChudWxsID09IGRpbSB8fCBpc05hTihkaW0pKSB7XG5cdFx0XHRcdGRpbSA9IHVuZGVmaW5lZDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZGltO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlc2l6ZSB0aGUgY29tcG9uZW50XG5cdCAqL1xuXHRyZXNpemUoKSB7XG5cdFx0Ly8gR2V0IHRoZSByYXcgYm9keSBlbGVtZW50XG5cdFx0bGV0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuXG5cdFx0Ly8gQ2FjaGUgdGhlIG9sZCBvdmVyZmxvdyBzdHlsZVxuXHRcdGxldCBvdmVyZmxvdzogc3RyaW5nID0gYm9keS5zdHlsZS5vdmVyZmxvdztcblx0XHRib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG5cblx0XHQvLyBUaGUgZmlyc3QgZWxlbWVudCBjaGlsZCBvZiBvdXIgc2VsZWN0b3Igc2hvdWxkIGJlIHRoZSA8ZGl2PiB3ZSBpbmplY3RlZFxuXHRcdGxldCByYXdFbGVtZW50ID0gdGhpcy5jaGFydEVsZW1lbnRbMF1bMF0uZmlyc3RFbGVtZW50Q2hpbGQ7XG5cblx0XHQvLyBEZXJpdmUgc2l6ZSBvZiB0aGUgcGFyZW50ICh0aGVyZSBhcmUgc2V2ZXJhbCB3YXlzIHRvIGRvIHRoaXMgZGVwZW5kaW5nIG9uIHRoZSBwYXJlbnQpXG5cdFx0bGV0IHdpZHRoOiBudW1iZXIgPSByYXdFbGVtZW50LmF0dHJpYnV0ZXMud2lkdGggfHwgcmF3RWxlbWVudC5zdHlsZS53aWR0aCB8fCByYXdFbGVtZW50LmNsaWVudFdpZHRoO1xuXHRcdGxldCBoZWlnaHQ6IG51bWJlciA9IHJhd0VsZW1lbnQuYXR0cmlidXRlcy5oZWlnaHQgfHwgcmF3RWxlbWVudC5zdHlsZS5oZWlnaHQgfHwgcmF3RWxlbWVudC5jbGllbnRIZWlnaHQ7XG5cblx0XHQvLyBSZWFwcGx5IHRoZSBvbGQgb3ZlcmZsb3cgc2V0dGluZ1xuXHRcdGJvZHkuc3R5bGUub3ZlcmZsb3cgPSBvdmVyZmxvdztcblxuXHRcdHRoaXMuc2V0Q2hhcnREaW1lbnNpb25zKHdpZHRoLCBoZWlnaHQsIGZhbHNlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNYW5hZ2UgYSBkZWxheWVkIHJlc2l6ZSBvZiB0aGUgY29tcG9uZW50XG5cdCAqL1xuXHRkZWxheVJlc2l6ZSgpIHtcblx0XHRpZiAobnVsbCAhPSB0aGlzLnJlc2l6ZVRpbWVyKSB7XG5cdFx0XHRjbGVhclRpbWVvdXQodGhpcy5yZXNpemVUaW1lcik7XG5cdFx0fVxuXHRcdHRoaXMucmVzaXplVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMucmVzaXplKCksIDIwMCk7XG5cdH1cbn1cbiJdfQ==
