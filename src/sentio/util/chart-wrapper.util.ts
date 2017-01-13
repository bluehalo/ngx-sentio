import { ElementRef, EventEmitter } from '@angular/core';
import * as d3 from 'd3';
import * as sentio from '@asymmetrik/sentio';

/**
 * Wrapper for chart info
 */
export class ChartWrapper<T extends sentio.internal.BaseChart> {
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
		this.chartElement = d3.select(el.nativeElement);
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
