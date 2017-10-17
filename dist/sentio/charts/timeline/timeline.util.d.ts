import { SimpleChange } from '@angular/core';
import { TimelineChart } from '@asymmetrik/sentio';
import { ChartWrapper } from '../../util/chart-wrapper.util';
import { ResizeInfo } from '../../util/resize.util';
/**
 * Wrapper for common timeline stuff
 */
export declare class TimelineUtil<T extends TimelineChart> {
    chartWrapper: ChartWrapper<T>;
    /**
     * Creates the chart, binds it to the dom element.
     * This doesn't do any DOM manipulation yet.
     * @param el
     * @param chart
     */
    constructor(chartWrapper: ChartWrapper<T>);
    setChartDimensions(dim: ResizeInfo, resizeWidth: boolean, resizeHeight: boolean, force?: boolean): void;
    /**
     * Did the state of the brush change?
     */
    didBrushChange: (current: [number, number], previous: [number, number]) => boolean;
    onChanges(changes: {
        [key: string]: SimpleChange;
    }): {
        resize: boolean;
        redraw: boolean;
    };
}
