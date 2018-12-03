import { EventEmitter, OnInit } from '@angular/core';
import { AutoBrushTimelineDirective } from '../auto-brush/auto-brush-timeline.directive';
import { TimelineDirective } from '../timeline.directive';
import { DynamicTimelineReadyEvent } from './dynamic-timeline-ready.event';
import { AutoBrushTimelineChart, TimelineChart } from '@asymmetrik/sentio';
export declare class DynamicTimelineDirective implements OnInit {
    timelineDirective: TimelineDirective;
    autoBrushDirective: AutoBrushTimelineDirective;
    chartReady: EventEmitter<DynamicTimelineReadyEvent>;
    timeline: TimelineChart;
    autoBrush: AutoBrushTimelineChart;
    setBrush(newBrush: [number, number]): void;
    ngOnInit(): void;
    private setTimelineExtent;
}
