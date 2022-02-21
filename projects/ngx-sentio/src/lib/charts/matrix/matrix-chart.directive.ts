import { Directive, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange } from '@angular/core';
import { chartMatrix, MatrixChart, Series } from '@asymmetrik/sentio';

import { ChartWrapper } from '../../util/chart-wrapper.util';


@Directive({
	selector: 'sentioMatrixChart'
})
export class MatrixChartDirective
	implements OnChanges, OnDestroy, OnInit {

	@Input('sentioData') data: any[];
	@Input('sentioSeries') series: Series[];
	@Input('sentioDuration') duration: number;

	// Chart Ready event
	@Output('sentioChartReady') chartReady = new EventEmitter<MatrixChart>();

	chartWrapper: ChartWrapper<MatrixChart>;

	constructor(el: ElementRef) {

		// Create the chart
		this.chartWrapper = new ChartWrapper<MatrixChart>(el, chartMatrix(), this.chartReady);

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

		if (changes['data']) {
			this.chartWrapper.chart.data(this.data);
			redraw = redraw || !changes['data'].isFirstChange();
		}
		if (changes['series']) {
			this.chartWrapper.chart.series(this.series);
			redraw = redraw || !changes['series'].isFirstChange();
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
