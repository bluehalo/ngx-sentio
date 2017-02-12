import { Directive, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange } from '@angular/core';
import * as sentio from '@asymmetrik/sentio';

import { ChartWrapper } from '../util/chart-wrapper.util';


@Directive({
	selector: 'sentioMatrixChart'
})
export class MatrixChartDirective
	implements OnChanges, OnDestroy, OnInit {

	@Input() model: any[];
	@Input() duration: number;

	// Chart Ready event
	@Output() chartReady = new EventEmitter<sentio.chart.MatrixChart>();

	chartWrapper: ChartWrapper<sentio.chart.MatrixChart>;

	constructor(el: ElementRef) {

		// Create the chart
		this.chartWrapper = new ChartWrapper<sentio.chart.MatrixChart>(el, sentio.chart.matrix(), this.chartReady);

	}

	ngOnInit() {

		// Initialize the chart
		this.chartWrapper.initialize();
		this.chartWrapper.chart.redraw();

	}

	ngOnDestroy() {
		// Nothing for now
	}

	ngOnChanges(changes: { [key: string]: SimpleChange }) {
		let redraw: boolean = false;

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
