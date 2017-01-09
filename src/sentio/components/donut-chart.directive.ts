import { Directive, ElementRef, HostListener, Input, OnChanges, OnDestroy, OnInit, SimpleChange } from '@angular/core';
import * as sentio from '@asymmetrik/sentio';

import { ChartWrapper } from '../util/chart-wrapper.util';
import { ResizeDimension, ResizeUtil } from '../util/resize.util';


@Directive({
	selector: 'sentioDonutChart'
})
export class DonutChartDirective
	implements OnChanges, OnDestroy, OnInit {

	@Input() model: Object[];
	@Input() colorScale: any;

	@Input('resize') resizeEnabled: boolean;
	@Input() duration: number;

	// Configure callback function for the chart
	@Input('configure') configureFn: (chart: any) => void;

	chartWrapper: ChartWrapper;
	resizeUtil: ResizeUtil;

	constructor(el: ElementRef) {

		// Create the chart
		this.chartWrapper = new ChartWrapper(el, sentio.chart.donut());

		// Set up the resizer
		this.resizeUtil = new ResizeUtil(el, this.resizeEnabled);

	}


	/**
	 * For the donut chart, we pin the height to the width
	 * to keep the aspect ratio correct
	 */
	setChartDimensions(dim: ResizeDimension): void {

		if (null != dim.width && this.chartWrapper.chart.width() !== dim.width) {

			// pin the height to the width
			this.chartWrapper.chart
				.width(dim.width)
				.height(dim.width)
				.resize();
		}

	}

	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		this.resizeUtil.resizeObserver.next(event);
	}

	ngOnInit() {

		// Initialize the chart
		this.chartWrapper.initialize();

		// Set up the resize callback
		this.resizeUtil.resizeSource
			.subscribe(() => {

				// Do the resize operation
				this.setChartDimensions(this.resizeUtil.getSize());
				this.chartWrapper.chart.redraw();

			});

		// Set the initial size of the chart
		this.setChartDimensions(this.resizeUtil.getSize());
		this.chartWrapper.chart.redraw();

	}

	ngOnDestroy() {
		this.resizeUtil.destroy();
	}

	ngOnChanges(changes: { [key: string]: SimpleChange }) {
		let resize: boolean = false;
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
		if (changes['colorScale']) {
			this.chartWrapper.chart.color(this.colorScale);
			redraw = redraw || !changes['colorScale'].isFirstChange();
		}
		if (changes['resize']) {
			this.resizeUtil.enabled = this.resizeEnabled;

			resize = resize || (this.resizeEnabled && !changes['resize'].isFirstChange());
			redraw = redraw || resize;
		}

		// Only redraw once if necessary
		if (resize) {
			this.chartWrapper.chart.resize();
		}
		if (redraw) {
			this.chartWrapper.chart.redraw();
		}
	}

}
