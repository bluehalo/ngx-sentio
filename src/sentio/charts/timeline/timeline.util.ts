import * as sentio from '@asymmetrik/sentio';

import { ChartWrapper } from '../../util/chart-wrapper.util';
import { ResizeDimension } from '../../util/resize.util';

/**
 * Wrapper for common timeline stuff
 */
export class TimelineUtil<T extends sentio.chart.TimelineChart> {

	chartWrapper: ChartWrapper<T>;

	/**
	 * Creates the chart, binds it to the dom element.
	 * This doesn't do any DOM manipulation yet.
	 * @param el
	 * @param chart
	 */
	constructor(chartWrapper: ChartWrapper<T>) {
		this.chartWrapper = chartWrapper;
	}


	setChartDimensions(dim: ResizeDimension, resizeWidth: boolean, resizeHeight: boolean, force: boolean = false): void {

		let resize = false;

		if ((force || resizeWidth) && null != dim.width && this.chartWrapper.chart.width() !== dim.width) {

			// pin the height to the width
			this.chartWrapper.chart
				.width(dim.width);
			resize = true;

		}

		if ((force || resizeHeight) && null != dim.height && this.chartWrapper.chart.height() !== dim.height) {

			// pin the height to the width
			this.chartWrapper.chart
				.height(dim.height);
			resize = true;

		}

		if (resize) {
			this.chartWrapper.chart.resize();
		}
	}
}
