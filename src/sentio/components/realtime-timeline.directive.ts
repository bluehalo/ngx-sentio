import { Directive, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange} from '@angular/core';

import * as sentio from '@asymmetrik/sentio';

import { ChartWrapper } from '../util/chart-wrapper.util';
import { ResizeDimension, ResizeUtil } from '../util/resize.util';


@Directive({
	selector: 'sentioRealtimeTimeline'
})
export class RealtimeTimelineDirective
	implements OnChanges, OnDestroy, OnInit {

	@Input() model: any[];
	@Input() markers: any[];
	@Input() yExtent: any[];
	@Input() xExtent: any[];
	@Input() delay: number;
	@Input() fps: number;
	@Input() interval: number;

	@Input() resizeWidth: boolean;
	@Input() resizeHeight: boolean;
	@Input() duration: number;

	// Chart Ready event
	@Output() chartReady = new EventEmitter<any>();

	// Interaction events
	@Output() markerOver = new EventEmitter<any>();
	@Output() markerOut = new EventEmitter<any>();
	@Output() markerClick = new EventEmitter<any>();

	chartWrapper: ChartWrapper;
	resizeUtil: ResizeUtil;

	constructor(el: ElementRef) {

		// Create the chart
		this.chartWrapper = new ChartWrapper(el, sentio.realtime.timeline(), this.chartReady);

		// Set up the resizer
		this.resizeUtil = new ResizeUtil(el, (this.resizeHeight || this.resizeWidth));

	}

	/**
	 * For the timeline, both dimensions scale independently
	 */
	setChartDimensions(dim: ResizeDimension): void {

		let resize = false;

		if (null != dim.width && this.chartWrapper.chart.width() !== dim.width) {

			// pin the height to the width
			this.chartWrapper.chart
				.width(dim.width);
			resize = true;

		}

		if (null != dim.height && this.chartWrapper.chart.height() !== dim.height) {

			// pin the height to the width
			this.chartWrapper.chart
				.height(dim.height);
			resize = true;

		}

		if (resize) {
			this.chartWrapper.chart.resize();
		}
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		this.resizeUtil.resizeObserver.next(event);
	}

	ngOnInit() {

		// Initialize the chart
		this.chartWrapper.initialize();

		// register for the marker events
		this.chartWrapper.chart.dispatch().on('markerClick', (p: any) => { this.markerClick.emit(p); });
		this.chartWrapper.chart.dispatch().on('markerMouseover', (p: any) => { this.markerOver.emit(p); });
		this.chartWrapper.chart.dispatch().on('markerMouseout', (p: any) => { this.markerOut.emit(p); });

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

		if (changes['model']) {
			this.chartWrapper.chart.data(this.model);
			redraw = redraw || !changes['model'].isFirstChange();
		}
		if (changes['markers']) {
			this.chartWrapper.chart.markers(this.markers);
			redraw = redraw || !changes['markers'].isFirstChange();
		}

		if (changes['yExtent']) {
			this.chartWrapper.chart.yExtent().overrideValue(this.yExtent);
			redraw = redraw || !changes['yExtent'].isFirstChange();
		}
		if (changes['xExtent']) {
			this.chartWrapper.chart.xExtent().overrideValue(this.xExtent);
			redraw = redraw || !changes['xExtent'].isFirstChange();
		}
		if (changes['duration']) {
			this.chartWrapper.chart.duration(this.duration);
		}

		if (changes['fps']) {
			this.chartWrapper.chart.fps(this.fps);
		}
		if (changes['delay']) {
			this.chartWrapper.chart.delay(this.delay);
			redraw = redraw || !changes['delay'].isFirstChange();
		}
		if (changes['interval']) {
			this.chartWrapper.chart.interval(this.interval);
			redraw = redraw || !changes['interval'].isFirstChange();
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
