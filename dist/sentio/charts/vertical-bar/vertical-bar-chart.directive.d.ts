import { ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChange } from '@angular/core';
import { VerticalBarsChart } from '@asymmetrik/sentio';
import { ChartWrapper } from '../../util/chart-wrapper.util';
import { ResizeDimension, ResizeUtil } from '../../util/resize.util';
export declare class VerticalBarChartDirective implements OnChanges, OnDestroy, OnInit {
    data: any[];
    widthExtent: [number, number];
    resizeEnabled: boolean;
    duration: number;
    chartReady: EventEmitter<VerticalBarsChart>;
    chartWrapper: ChartWrapper<VerticalBarsChart>;
    resizeUtil: ResizeUtil;
    constructor(el: ElementRef);
    /**
     * For The vertical bar chart, we just resize width
     */
    setChartDimensions(dim: ResizeDimension, force?: boolean): void;
    onResize(event: any): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
}
