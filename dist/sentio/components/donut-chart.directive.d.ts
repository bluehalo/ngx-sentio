import { ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChange } from '@angular/core';
import * as sentio from '@asymmetrik/sentio';
import { ChartWrapper } from '../util/chart-wrapper.util';
import { ResizeDimension, ResizeUtil } from '../util/resize.util';
export declare class DonutChartDirective implements OnChanges, OnDestroy, OnInit {
    model: any[];
    colorScale: any;
    resizeEnabled: boolean;
    duration: number;
    chartReady: EventEmitter<sentio.chart.DonutChart>;
    chartWrapper: ChartWrapper<sentio.chart.DonutChart>;
    resizeUtil: ResizeUtil;
    constructor(el: ElementRef);
    /**
     * For the donut chart, we pin the height to the width
     * to keep the aspect ratio correct
     */
    setChartDimensions(dim: ResizeDimension, force?: boolean): void;
    onResize(event: any): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
}
