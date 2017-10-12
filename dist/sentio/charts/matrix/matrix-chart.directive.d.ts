import { ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChange } from '@angular/core';
import { MatrixChart } from '@asymmetrik/sentio';
import { ChartWrapper } from '../../util/chart-wrapper.util';
export declare class MatrixChartDirective implements OnChanges, OnDestroy, OnInit {
    data: any[];
    duration: number;
    chartReady: EventEmitter<MatrixChart>;
    chartWrapper: ChartWrapper<MatrixChart>;
    constructor(el: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
}
