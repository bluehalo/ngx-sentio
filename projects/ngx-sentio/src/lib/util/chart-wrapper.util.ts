import { ElementRef, EventEmitter } from '@angular/core';

import { select as d3_select } from 'd3-selection';

import { internal } from '@asymmetrik/sentio';

/**
 * Wrapper for chart info
 */
export class ChartWrapper<T extends internal.BaseChart> {
	chart: T;
	chartElement: any;
	chartReady: EventEmitter<T>;

	/**
	 * Creates the chart, binds it to the dom element.
	 * This doesn't do any DOM manipulation yet.
	 * @param el
	 * @param chart
	 */
	constructor(el: ElementRef, chart: T, chartReady: EventEmitter<T>) {
		this.chartElement = d3_select(el.nativeElement);
		this.chart = chart;
		this.chartReady = chartReady;
	}

	/**
	 * Initializes the chart, creating its DOM structure
	 */
	initialize() {
		this.chart.init(this.chartElement);
		this.chartReady.emit(this.chart);
	}
}
