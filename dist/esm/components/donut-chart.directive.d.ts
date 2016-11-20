import { ElementRef, OnChanges, SimpleChange } from '@angular/core';
import { BaseChartDirective } from './base-chart.directive';
export declare class DonutChartDirective extends BaseChartDirective implements OnChanges {
    model: Object[];
    colorScale: any;
    resizeChart: boolean;
    duration: number;
    configureFn: (chart: any) => void;
    constructor(el: ElementRef);
    /**
     * For the donut chart, we pin the height to the width
     * to keep the aspect ratio correct
     */
    setChartDimensions(width: number, height: number, force?: boolean): void;
    onResize(event: any): void;
    ngOnInit(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
}
