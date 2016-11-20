import { ElementRef, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { BaseChartDirective } from './base-chart.directive';
export declare class RealtimeTimelineDirective extends BaseChartDirective implements OnChanges {
    model: Object[];
    markers: Object[];
    yExtent: Object[];
    xExtent: Object[];
    delay: number;
    fps: number;
    interval: number;
    resizeWidth: boolean;
    resizeHeight: boolean;
    duration: number;
    configureFn: (chart: any) => void;
    markerOver: EventEmitter<Object>;
    markerOut: EventEmitter<Object>;
    markerClick: EventEmitter<Object>;
    constructor(el: ElementRef);
    /**
     * For the timeline, both dimensions scale independently
     */
    setChartDimensions(width: number, height: number, force?: boolean): void;
    onResize(event: any): void;
    ngOnInit(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
}
