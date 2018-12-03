import { ElementRef } from '@angular/core';
import { Observable, Observer } from 'rxjs';
export interface ElementSize {
    width: number;
    height: number;
}
export interface ResizeInfo {
    element: ElementSize;
    parent: ElementSize;
}
/**
 * Resize utility class
 */
export declare class ResizeUtil {
    chartElement: any;
    enabled: boolean;
    resizeSource: Observable<ResizeInfo>;
    resizeObserver: Observer<ResizeInfo>;
    constructor(el: ElementRef, enabled?: boolean, debounce?: number, sampleNum?: number);
    static parseFloat(value: any, defaultValue: number): number;
    /**
     * Determines the numerical dimension given a string representation
     * Assumes the string is in the form 'NNNNNpx', more specifically
     * an arbitrarily long sequence of digits terminated by 'px'
     *
     * @param dimStr A string representation of the pixel size
     * @returns {number} the numerical representation of the pixel size
     */
    static getPixelDimension(dimStr: string): number;
    getComputedElementSize(element: any): ElementSize;
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
    getSize(): ResizeInfo;
    destroy(): void;
}
