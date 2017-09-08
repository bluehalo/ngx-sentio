import { ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChange } from '@angular/core';
import * as sentio from '@asymmetrik/sentio';
import { ChartWrapper } from '../../util/chart-wrapper.util';
import { ResizeUtil } from '../../util/resize.util';
import { TimelineUtil } from './timeline.util';
export declare class TimelineDirective implements OnChanges, OnDestroy, OnInit {
    model: any[];
    markers: any[];
    yExtent: [number, number];
    xExtent: [number, number];
    resizeWidth: boolean;
    resizeHeight: boolean;
    chartReady: EventEmitter<sentio.chart.TimelineChart>;
    filterEnabled: boolean;
    filterState: [number, number] | null;
    filterChange: EventEmitter<[number, number]>;
    markerOver: EventEmitter<any>;
    markerOut: EventEmitter<any>;
    markerClick: EventEmitter<any>;
    chartWrapper: ChartWrapper<sentio.chart.TimelineChart>;
    resizeUtil: ResizeUtil;
    timelineUtil: TimelineUtil<sentio.chart.TimelineChart>;
    constructor(el: ElementRef);
    /**
     * Did the state of the filter change?
     */
    didFilterChange: (current: [number, number], previous: [number, number]) => boolean;
    onResize(event: any): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
}
