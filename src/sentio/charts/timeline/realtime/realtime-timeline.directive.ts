import { Directive, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange} from '@angular/core';

import * as sentio from '@asymmetrik/sentio';

import { ChartWrapper } from '../../../util/chart-wrapper.util';
import { ResizeUtil } from '../../../util/resize.util';
import { TimelineUtil } from '../timeline.util';


@Directive({
	selector: 'sentioRealtimeTimeline'
})
export class RealtimeTimelineDirective
	implements OnChanges, OnDestroy, OnInit {

	@Input() model: any[];
	@Input() markers: any[];

	@Input() yExtent: [number, number];
	@Input() xExtent: [number, number];

	@Input() delay: number;
	@Input() fps: number;
	@Input() interval: number;

	@Input() resizeWidth: boolean;
	@Input() resizeHeight: boolean;

	// Chart Ready event
	@Output() chartReady = new EventEmitter<sentio.chart.RealtimeTimelineChart>();

	// Interaction events
	@Output() markerOver = new EventEmitter<any>();
	@Output() markerOut = new EventEmitter<any>();
	@Output() markerClick = new EventEmitter<any>();

	chartWrapper: ChartWrapper<sentio.chart.RealtimeTimelineChart>;
	resizeUtil: ResizeUtil;
	timelineUtil: TimelineUtil<sentio.chart.RealtimeTimelineChart>;

	constructor(el: ElementRef) {

		// Create the chart
		this.chartWrapper = new ChartWrapper<sentio.chart.RealtimeTimelineChart>(el, sentio.chart.realtimeTimeline(), this.chartReady);

		// Set up the resizer
		this.resizeUtil = new ResizeUtil(el, (this.resizeHeight || this.resizeWidth));
		this.timelineUtil = new TimelineUtil<sentio.chart.RealtimeTimelineChart>(this.chartWrapper);

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
				this.timelineUtil.setChartDimensions(this.resizeUtil.getSize(), this.resizeWidth, this.resizeHeight);
				this.chartWrapper.chart.redraw();

			});

		// Set the initial size of the chart
		this.timelineUtil.setChartDimensions(this.resizeUtil.getSize(), this.resizeWidth, this.resizeHeight, true);
		this.chartWrapper.chart.redraw();

	}

	ngOnDestroy() {
		this.resizeUtil.destroy();
	}

	ngOnChanges(changes: { [key: string]: SimpleChange }) {

		const resize: boolean = false;
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
