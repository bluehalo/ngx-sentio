import { ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChange } from '@angular/core';
import * as sentio from '@asymmetrik/sentio';
import { ChartWrapper } from '../../../util/chart-wrapper.util';
import { ResizeUtil } from '../../../util/resize.util';
import { TimelineUtil } from '../timeline.util';
export declare class RealtimeTimelineDirective implements OnChanges, OnDestroy, OnInit {
    model: any[];
    markers: any[];
    yExtent: [number, number];
    xExtent: [number, number];
    delay: number;
    fps: number;
    interval: number;
    resizeWidth: boolean;
    resizeHeight: boolean;
    chartReady: EventEmitter<sentio.chart.RealtimeTimelineChart>;
    markerOver: EventEmitter<any>;
    markerOut: EventEmitter<any>;
    markerClick: EventEmitter<any>;
    chartWrapper: ChartWrapper<sentio.chart.RealtimeTimelineChart>;
    resizeUtil: ResizeUtil;
    timelineUtil: TimelineUtil<sentio.chart.RealtimeTimelineChart>;
    constructor(el: ElementRef);
    onResize(event: any): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
}
