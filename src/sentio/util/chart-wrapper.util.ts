import { ElementRef, EventEmitter } from '@angular/core';
import * as d3 from 'd3';

/**
 * Wrapper for chart info
 */
export class ChartWrapper {
	chart: any;
	chartElement: any;
	chartReady: EventEmitter<any>;

	/**
	 * Creates the chart, binds it to the dom element.
	 * This doesn't do any DOM manipulation yet.
	 * @param el
	 * @param chart
	 */
	constructor(el: ElementRef, chart: any, chartReady: EventEmitter<any>) {
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
