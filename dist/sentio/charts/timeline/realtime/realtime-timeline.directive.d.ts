import { ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChange } from '@angular/core';
import { RealtimeTimelineChart, Series } from '@asymmetrik/sentio';
import { ChartWrapper } from '../../../util/chart-wrapper.util';
import { ResizeUtil } from '../../../util/resize.util';
import { TimelineUtil } from '../timeline.util';
export declare class RealtimeTimelineDirective implements OnChanges, OnDestroy, OnInit {
    data: any[];
    series: Series[];
    markers: any[];
    yExtent: [number, number];
    xExtent: [number, number];
    showGrid: boolean;
    showXGrid: boolean;
    showYGrid: boolean;
    delay: number;
    fps: number;
    interval: number;
    resizeWidth: boolean;
    resizeHeight: boolean;
    chartReady: EventEmitter<RealtimeTimelineChart>;
    markerMouseover: EventEmitter<any>;
    markerMouseout: EventEmitter<any>;
    markerClick: EventEmitter<any>;
    chartWrapper: ChartWrapper<RealtimeTimelineChart>;
    resizeUtil: ResizeUtil;
    timelineUtil: TimelineUtil<RealtimeTimelineChart>;
    constructor(el: ElementRef);
    onResize(event: any): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
}
