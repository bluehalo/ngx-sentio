import { ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChange } from '@angular/core';
import * as sentio from '@asymmetrik/sentio';
import { ChartWrapper } from '../../util/chart-wrapper.util';
export declare class MatrixChartDirective implements OnChanges, OnDestroy, OnInit {
    model: any[];
    duration: number;
    chartReady: EventEmitter<sentio.chart.MatrixChart>;
    chartWrapper: ChartWrapper<sentio.chart.MatrixChart>;
    constructor(el: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
}
