import { ElementRef, OnChanges, SimpleChange } from '@angular/core';
import { BaseChartDirective } from './base-chart.directive';
export declare class MatrixChartDirective extends BaseChartDirective implements OnChanges {
    model: Object[];
    resizeHeight: boolean;
    resizeWidth: boolean;
    duration: number;
    configureFn: (chart: any) => void;
    constructor(el: ElementRef);
    /**
     * For the matrix chart, we scale height and width independently
     */
    setChartDimensions(width: number, height: number, force?: boolean): void;
    onResize(event: any): void;
    ngOnInit(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
}
