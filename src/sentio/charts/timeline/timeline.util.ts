import { SimpleChange } from '@angular/core';

import { TimelineChart } from '@asymmetrik/sentio';

import { ChartWrapper } from '../../util/chart-wrapper.util';
import { ResizeDimension } from '../../util/resize.util';

/**
 * Wrapper for common timeline stuff
 */
export class TimelineUtil<T extends TimelineChart> {

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

	/**
	 * Did the state of the brush change?
	 */
	didBrushChange = (current: [ number, number ] | null, previous: [ number, number ] | null) => {

		// Deep compare the brush
		if (current === previous ||
			(null != current && null != previous
			&& current[0] === previous[0]
			&& current[1] === previous[1])) {
			return false;
		}

		// We know it changed
		return true;

	}


	onChanges(changes: { [key: string]: SimpleChange }): { resize: boolean, redraw: boolean } {

		const resize: boolean = false;
		let redraw: boolean = false;

		if (changes['data']) {
			this.chartWrapper.chart.data(changes['data'].currentValue);
			redraw = redraw || !changes['data'].isFirstChange();
		}
		if (changes['series']) {
			this.chartWrapper.chart.series(changes['series'].currentValue);
			redraw = redraw || !changes['series'].isFirstChange();
		}
		if (changes['markers']) {
			this.chartWrapper.chart.markers(changes['markers'].currentValue);
			redraw = redraw || !changes['markers'].isFirstChange();
		}

		if (changes['yExtent']) {
			this.chartWrapper.chart.yExtent().overrideValue(changes['yExtent'].currentValue);
			redraw = redraw || !changes['yExtent'].isFirstChange();
		}
		if (changes['xExtent']) {
			this.chartWrapper.chart.xExtent().overrideValue(changes['xExtent'].currentValue);
			redraw = redraw || !changes['xExtent'].isFirstChange();
		}

		if (changes['showGrid']) {
			this.chartWrapper.chart.showGrid(changes['showGrid'].currentValue);
			redraw = redraw || !changes['showGrid'].isFirstChange();
		}
		if (changes['showXGrid']) {
			this.chartWrapper.chart.showXGrid(changes['showXGrid'].currentValue);
			redraw = redraw || !changes['showXGrid'].isFirstChange();
		}
		if (changes['showYGrid']) {
			this.chartWrapper.chart.showYGrid(changes['showYGrid'].currentValue);
			redraw = redraw || !changes['showYGrid'].isFirstChange();
		}
		if (changes['pointEvents']) {
			this.chartWrapper.chart.pointEvents(changes['pointEvents'].currentValue);
			redraw = redraw || !changes['showYGrid'].isFirstChange();
		}

		if (changes['brushEnabled']) {
			this.chartWrapper.chart.brush(changes['brushEnabled'].currentValue);
			redraw = redraw || !changes['brushEnabled'].isFirstChange();
		}
		if (changes['brushState'] && !changes['brushState'].isFirstChange()) {

			// Only apply it if it actually changed
			if (this.didBrushChange(changes['brushState'].currentValue, changes['brushState'].previousValue)) {

				this.chartWrapper.chart.setBrush(changes['brushState'].currentValue);
				redraw = true;

			}

		}

		return { resize, redraw };

	}

}
