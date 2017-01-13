import { ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChange } from '@angular/core';
import * as sentio from '@asymmetrik/sentio';
import { ChartWrapper } from '../util/chart-wrapper.util';
import { ResizeDimension, ResizeUtil } from '../util/resize.util';
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
    constructor(el: ElementRef);
    /**
     * For the timeline, both dimensions scale independently
     */
    setChartDimensions(dim: ResizeDimension): void;
    onResize(event: any): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
}
