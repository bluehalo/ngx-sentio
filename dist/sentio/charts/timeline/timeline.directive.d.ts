import { ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChange } from '@angular/core';
import { PointEvents, Series, TimelineChart } from '@asymmetrik/sentio';
import { ChartWrapper } from '../../util/chart-wrapper.util';
import { ResizeUtil } from '../../util/resize.util';
import { TimelineUtil } from './timeline.util';
export declare class TimelineDirective implements OnChanges, OnDestroy, OnInit {
    data: any[];
    series: Series[];
    markers: any[];
    yExtent: [number, number];
    xExtent: [number, number];
    showGrid: boolean;
    showXGrid: boolean;
    showYGrid: boolean;
    pointEvents: PointEvents;
    resizeWidth: boolean;
    resizeHeight: boolean;
    chartReady: EventEmitter<TimelineChart>;
    brushEnabled: boolean;
    brushState: [number, number];
    brush: EventEmitter<[number, number]>;
    pointMouseover: EventEmitter<any>;
    pointMouseout: EventEmitter<any>;
    pointClick: EventEmitter<any>;
    markerMouseover: EventEmitter<any>;
    markerMouseout: EventEmitter<any>;
    markerClick: EventEmitter<any>;
    chartWrapper: ChartWrapper<TimelineChart>;
    resizeUtil: ResizeUtil;
    timelineUtil: TimelineUtil<TimelineChart>;
    constructor(el: ElementRef);
    onResize(event: any): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
}
