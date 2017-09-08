import * as sentio from '@asymmetrik/sentio';
import { ChartWrapper } from '../../util/chart-wrapper.util';
import { ResizeDimension } from '../../util/resize.util';
/**
 * Wrapper for common timeline stuff
 */
export declare class TimelineUtil<T extends sentio.chart.TimelineChart> {
    chartWrapper: ChartWrapper<T>;
    /**
     * Creates the chart, binds it to the dom element.
     * This doesn't do any DOM manipulation yet.
     * @param el
     * @param chart
     */
    constructor(chartWrapper: ChartWrapper<T>);
    setChartDimensions(dim: ResizeDimension, resizeWidth: boolean, resizeHeight: boolean, force?: boolean): void;
}
