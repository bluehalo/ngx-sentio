import { ElementRef } from '@angular/core';
import { Observable, Observer } from 'rxjs';
export declare class ResizeDimension {
    width: number;
    height: number;
    constructor(width: number, height: number);
}
/**
 * Resize utility class
 */
export declare class ResizeUtil {
    chartElement: any;
    enabled: boolean;
    resizeSource: Observable<ResizeDimension>;
    resizeObserver: Observer<ResizeDimension>;
    constructor(el: ElementRef, enabled?: boolean, debounce?: number, sample?: number);
    /**
     * Determines the numerical dimension given a string representation
     * Assumes the string is in the form 'NNNNNpx', more specifically
     * an arbitrarily long sequence of digits terminated by 'px'
     *
     * @param dimStr A string representation of the pixel size
     * @returns {number} the numerical representation of the pixel size
     */
    static getPixelDimension(dimStr: string): number;
    /**
     * Returns the size of the element (only returns height/width if they are specified on the DOM elements)
     * Checks attributes and style
     *
     * @param element
     * @returns {ResizeDimension}
     */
    static getSpecifiedSize(element: any): ResizeDimension;
    /**
     * Returns the size of the element
     * Checks client size
     *
     * @param element
     * @returns {ResizeDimension}
     */
    static getActualSize(element: any): ResizeDimension;
    /**
     * Gets the specified dimensions of the element
     * @returns {ResizeDimension}
     */
    getSpecifiedSize(): ResizeDimension;
    /**
     * Get the element size (with no overflow)
     * @returns {ResizeDimension}
     */
    getActualSize(): ResizeDimension;
    /**
     * Gets the size of the element (this is the actual size overridden by specified size)
     * @returns {ResizeDimension}
     */
    getSize(): ResizeDimension;
    destroy(): void;
}
