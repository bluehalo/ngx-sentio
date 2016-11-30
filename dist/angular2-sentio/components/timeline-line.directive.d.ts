/// <reference types="core-js" />
import { ElementRef, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { BaseChartDirective } from './base-chart.directive';
export declare class TimelineLineDirective extends BaseChartDirective implements OnChanges {
    model: Object[];
    markers: Object[];
    yExtent: Object[];
    xExtent: Object[];
    resizeWidth: boolean;
    resizeHeight: boolean;
    duration: number;
    configureFn: (chart: any) => void;
    filterEnabled: boolean;
    filterState: Object[];
    filterChange: EventEmitter<Object[]>;
    markerOver: EventEmitter<Object>;
    markerOut: EventEmitter<Object>;
    markerClick: EventEmitter<Object>;
    constructor(el: ElementRef);
    /**
     * For the timeline, both dimensions scale independently
     */
    setChartDimensions(width: number, height: number, force?: boolean): void;
    /**
     * Did the state of the filter change?
     */
    didFilterChange: (current: Object[], previous: Object[]) => boolean;
    onResize(event: any): void;
    ngOnInit(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
}
