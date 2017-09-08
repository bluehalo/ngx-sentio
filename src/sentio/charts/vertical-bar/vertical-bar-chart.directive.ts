import { Directive, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange } from '@angular/core';
import * as sentio from '@asymmetrik/sentio';

import { ChartWrapper } from '../../util/chart-wrapper.util';
import { ResizeDimension, ResizeUtil } from '../../util/resize.util';


@Directive({
	selector: 'sentioVerticalBarChart'
})
export class VerticalBarChartDirective
	implements OnChanges, OnDestroy, OnInit {

	@Input() model: any[];
	@Input() widthExtent: [number, number];

	@Input('resize') resizeEnabled: boolean;
	@Input() duration: number;

	// Chart Ready event
	@Output() chartReady = new EventEmitter<sentio.chart.VerticalBarsChart>();

	chartWrapper: ChartWrapper<sentio.chart.VerticalBarsChart>;
	resizeUtil: ResizeUtil;

	constructor(el: ElementRef) {

		// Create the chart
		this.chartWrapper = new ChartWrapper<sentio.chart.VerticalBarsChart>(el, sentio.chart.verticalBars(), this.chartReady);

		// Set up the resizer
		this.resizeUtil = new ResizeUtil(el, this.resizeEnabled);
	}

	/**
	 * For The vertical bar chart, we just resize width
	 */
	setChartDimensions(dim: ResizeDimension, force: boolean = false): void {

		if ((force || this.resizeEnabled) && null != dim.width && this.chartWrapper.chart.width() !== dim.width) {

			// pin the height to the width
			this.chartWrapper.chart
				.width(dim.width)
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
		this.setChartDimensions(this.resizeUtil.getSize(), true);
		this.chartWrapper.chart.redraw();
	}

	ngOnDestroy() {
		this.resizeUtil.destroy();
	}

	ngOnChanges(changes: { [key: string]: SimpleChange }) {
		let resize: boolean = false;
		let redraw: boolean = false;

		if (changes['model']) {
			this.chartWrapper.chart.data(this.model);
			redraw = redraw || !changes['model'].isFirstChange();
		}

		if (changes['widthExtent']) {
			this.chartWrapper.chart.widthExtent().overrideValue(this.widthExtent);
			redraw = redraw || !changes['widthExtent'].isFirstChange();
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
