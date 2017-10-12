import { ElementRef, EventEmitter } from '@angular/core';
import { internal } from '@asymmetrik/sentio';
/**
 * Wrapper for chart info
 */
export declare class ChartWrapper<T extends internal.BaseChart> {
    chart: T;
    chartElement: any;
    chartReady: EventEmitter<T>;
    /**
     * Creates the chart, binds it to the dom element.
     * This doesn't do any DOM manipulation yet.
     * @param el
     * @param chart
     */
    constructor(el: ElementRef, chart: T, chartReady: EventEmitter<T>);
    /**
     * Initializes the chart, creating its DOM structure
     */
    initialize(): void;
}
