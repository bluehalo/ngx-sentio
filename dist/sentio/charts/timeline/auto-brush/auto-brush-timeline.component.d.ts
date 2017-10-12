import { ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChange } from '@angular/core';
import { AutoBrushTimelineChart, Series } from '@asymmetrik/sentio';
import { ChartWrapper } from '../../../util/chart-wrapper.util';
import { ResizeUtil } from '../../../util/resize.util';
import { TimelineUtil } from '../timeline.util';
export declare class AutoBrushTimelineComponent implements OnChanges, OnDestroy, OnInit {
    data: any[];
    series: Series[];
    markers: any[];
    yExtent: [number, number];
    xExtent: [number, number];
    resizeWidth: boolean;
    resizeHeight: boolean;
    chartReady: EventEmitter<AutoBrushTimelineChart>;
    brushEnabled: boolean;
    brushState: [number, number];
    brushChange: EventEmitter<[number, number]>;
    markerMouseover: EventEmitter<any>;
    markerMouseout: EventEmitter<any>;
    markerClick: EventEmitter<any>;
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
