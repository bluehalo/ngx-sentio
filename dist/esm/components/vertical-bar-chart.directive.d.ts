import { ElementRef, OnChanges, SimpleChange } from '@angular/core';
import { BaseChartDirective } from './base-chart.directive';
export declare class VerticalBarChartDirective extends BaseChartDirective implements OnChanges {
    model: Object[];
    widthExtent: Object[];
    resizeChart: boolean;
    duration: number;
    configureFn: (chart: any) => void;
    constructor(el: ElementRef);
    /**
     * For The vertical bar chart, we just resize width
     */
    setChartDimensions(width: number, height: number, force?: boolean): void;
    onResize(event: any): void;
    ngOnInit(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
}
