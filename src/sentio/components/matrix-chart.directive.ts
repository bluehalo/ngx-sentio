import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChange } from '@angular/core';
import * as sentio from '@asymmetrik/sentio';

import { ChartWrapper } from '../util/chart-wrapper.util';


@Directive({
	selector: 'sentioMatrixChart'
})
export class MatrixChartDirective
	implements OnChanges, OnInit {

	@Input() model: Object[];
	@Input() duration: number;

	// Configure callback function for the chart
	@Input('configure') configureFn: (chart: any) => void;

	chartWrapper: ChartWrapper;

	constructor(el: ElementRef) {

		// Create the chart
		this.chartWrapper = new ChartWrapper(el, sentio.chart.matrix());

	}

	ngOnInit() {

		// Initialize the chart
		this.chartWrapper.initialize();
		this.chartWrapper.chart.redraw();

	}

	ngOnChanges(changes: { [key: string]: SimpleChange }) {
		let redraw: boolean = false;

		// Configure the chart
		if (changes['configureFn'] && changes['configureFn'].isFirstChange()) {
			this.chartWrapper.configure(this.configureFn);
		}

		if (changes['model']) {
			this.chartWrapper.chart.data(this.model);
			redraw = redraw || !changes['model'].isFirstChange();
		}
		if (changes['duration']) {
			this.chartWrapper.chart.duration(this.duration);
		}

		// Only redraw once if possible
		if (redraw) {
			this.chartWrapper.chart.redraw();
		}
	}
}
