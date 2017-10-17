import { ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChange } from '@angular/core';
import { AutoBrushTimelineChart, Series } from '@asymmetrik/sentio';
import { ChartWrapper } from '../../../util/chart-wrapper.util';
import { ResizeUtil } from '../../../util/resize.util';
import { TimelineUtil } from '../timeline.util';
export declare class AutoBrushTimelineDirective implements OnChanges, OnDestroy, OnInit {
    data: any[];
    series: Series[];
    yExtent: [number, number];
    resizeWidth: boolean;
    resizeHeight: boolean;
    edgeTrigger: number;
    zoomInTrigger: number;
    zoomOutTrigger: number;
    zoomTarget: number;
    maxExtent: [number, number];
    minExtent: number;
    minBrush: number;
    chartReady: EventEmitter<AutoBrushTimelineChart>;
    brushState: [number, number];
    brushChange: EventEmitter<[number, number]>;
    extentChange: EventEmitter<[number, number]>;
    chartWrapper: ChartWrapper<AutoBrushTimelineChart>;
    resizeUtil: ResizeUtil;
    timelineUtil: TimelineUtil<AutoBrushTimelineChart>;
    constructor(el: ElementRef);
    onResize(event: any): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
}
