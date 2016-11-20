import { ElementRef } from '@angular/core';
/**
 * Base Directive Object for all charts
 */
export declare abstract class BaseChartDirective {
    chart: any;
    chartElement: any;
    resizeTimer: number;
    constructor(el: ElementRef, chart: any);
    /**
     * Set the chart dimensions according to the implementation
     * behavior, the configuration, and the parameters.
     *
     * @param width Width to which to optionally resize in pixels
     * @param height Height to which to optionally resize in pixels
     * @param force Should the resize ignore the resize configuration? (optional, should default to false)
     */
    abstract setChartDimensions(width: number, height: number, force?: boolean): void;
    /**
     * Determines the numerical dimension given a string representation
     * Assumes the string is in the form "NNNNN"px"", more specifically
     * an arbitrarily long sequence of digits terminated by "px"
     *
     * @param dimStr A string representation of the pixel size
     * @returns {number} the numerical representation of the pixel size
     */
    getPixelDimension(dimStr: string): number;
    /**
     * Resize the component
     */
    resize(): void;
    /**
     * Manage a delayed resize of the component
     */
    delayResize(): void;
}
