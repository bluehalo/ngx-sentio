import { ElementRef, EventEmitter } from '@angular/core';
import * as d3 from 'd3';

/**
 * Wrapper for chart info
 */
export class ChartWrapper {
	chart: any;
	chartElement: any;
	configureFn: (chart: any) => void;

	/**
	 * Creates the chart, binds it to the dom element.
	 * This doesn't do any DOM manipulation yet.
	 * @param el
	 * @param chart
	 */
	constructor(el: ElementRef, chart: any) {
		this.chartElement = d3.select(el.nativeElement);
		this.chart = chart;
	}

	/**
	 * Sets up the configure function (should happen before initialize if it's going to happen).
	 * Still doesn't do any DOM manipulation.
	 * @param configureFn
	 */
	configure(configureFn: (chart: any) => void) {
		this.configureFn = configureFn;
		if (null != this.configureFn) {
			this.configureFn(this.chart);
		}
	}

	/**
	 * Initializes the chart, creating its DOM structure
	 */
	initialize() {
		this.chart.init(this.chartElement);
	}
}
