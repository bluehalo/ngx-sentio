import { Directive, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange } from '@angular/core';
import { chartDonut, DonutChart } from '@asymmetrik/sentio';

import { ChartWrapper } from '../../util/chart-wrapper.util';
import { ElementSize, ResizeInfo, ResizeUtil } from '../../util/resize.util';


@Directive({
	selector: 'sentioDonutChart'
})
export class DonutChartDirective
	implements OnChanges, OnDestroy, OnInit {

	@Input('sentioData') data: any[];
	@Input('sentioColorScale') colorScale: any;

	@Input('sentioResize') resizeEnabled: boolean;
	@Input('sentioDuration') duration: number;

	// Chart Ready event
	@Output('sentioChartReady') chartReady = new EventEmitter<DonutChart>();

	chartWrapper: ChartWrapper<DonutChart>;
	resizeUtil: ResizeUtil;

	constructor(el: ElementRef) {

		// Create the chart
		this.chartWrapper = new ChartWrapper<DonutChart>(el, chartDonut(), this.chartReady);

		// Set up the resizer
		this.resizeUtil = new ResizeUtil(el, this.resizeEnabled);

	}


	/**
	 * For the donut chart, we pin the height to the width
	 * to keep the aspect ratio correct
	 */
	setChartDimensions(dim: ResizeInfo, force: boolean = false): void {

		let size: ElementSize;

		// If resize is enabled, we want to resize to parent
		if (this.resizeEnabled) {
			size = dim.parent;
		}
		// If resize isn't enabled but we're forcing resize, we want to resize to element
		else if (force) {
			size = dim.element;
		}

		if (null != size && null != size.width && this.chartWrapper.chart.width() !== size.width) {

			// pin the height to the width
			this.chartWrapper.chart
				.width(size.width)
				.height(size.width)
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

		if (changes['data']) {
			this.chartWrapper.chart.data(this.data);
			redraw = redraw || !changes['data'].isFirstChange();
		}

		if (changes['duration']) {
			this.chartWrapper.chart.duration(this.duration);
		}
		if (changes['colorScale']) {
			this.chartWrapper.chart.colorScale(this.colorScale);
			redraw = redraw || !changes['colorScale'].isFirstChange();
		}
		if (changes['resizeEnabled']) {
			this.resizeUtil.enabled = this.resizeEnabled;

			resize = resize || (this.resizeEnabled && !changes['resizeEnabled'].isFirstChange());
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
