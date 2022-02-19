import { Directive, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange} from '@angular/core';

import { chartRealtimeTimeline, RealtimeTimelineChart, Series } from '@asymmetrik/sentio';

import { ChartWrapper } from '../../../util/chart-wrapper.util';
import { ResizeUtil } from '../../../util/resize.util';
import { TimelineUtil } from '../timeline.util';


@Directive({
	selector: 'sentioRealtimeTimeline'
})
export class RealtimeTimelineDirective
	implements OnChanges, OnDestroy, OnInit {

	@Input('sentioData') data: any[];
	@Input('sentioSeries') series: Series[];
	@Input('sentioMarkers') markers: any[];

	@Input('sentioYExtent') yExtent: [number, number];
	@Input('sentioXExtent') xExtent: [number, number];

	@Input('sentioShowGrid') showGrid: boolean;
	@Input('sentioShowXGrid') showXGrid: boolean;
	@Input('sentioShowYGrid') showYGrid: boolean;

	@Input('sentioDelay') delay: number;
	@Input('sentioFps') fps: number;
	@Input('sentioInterval') interval: number;

	@Input('sentioResizeWidth') resizeWidth: boolean;
	@Input('sentioResizeHeight') resizeHeight: boolean;

	// Chart Ready event
	@Output('sentioChartReady') chartReady = new EventEmitter<RealtimeTimelineChart>();

	// Interaction events
	@Output('sentioMarkerMouseover') markerMouseover = new EventEmitter<any>();
	@Output('sentioMarkerMouseout') markerMouseout = new EventEmitter<any>();
	@Output('sentioMarkerClick') markerClick = new EventEmitter<any>();

	chartWrapper: ChartWrapper<RealtimeTimelineChart>;
	resizeUtil: ResizeUtil;
	timelineUtil: TimelineUtil<RealtimeTimelineChart>;

	constructor(el: ElementRef) {

		// Create the chart
		this.chartWrapper = new ChartWrapper<RealtimeTimelineChart>(el, chartRealtimeTimeline(), this.chartReady);

		// Set up the resizer
		this.resizeUtil = new ResizeUtil(el, (this.resizeHeight || this.resizeWidth));
		this.timelineUtil = new TimelineUtil<RealtimeTimelineChart>(this.chartWrapper);

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
		this.chartWrapper.chart.dispatch().on('markerMouseover', (p: any) => { this.markerMouseover.emit(p); });
		this.chartWrapper.chart.dispatch().on('markerMouseout', (p: any) => { this.markerMouseout.emit(p); });

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

		const retVal = this.timelineUtil.onChanges(changes);

		if (changes['fps']) {
			this.chartWrapper.chart.fps(this.fps);
		}
		if (changes['delay']) {
			this.chartWrapper.chart.delay(this.delay);
			retVal.redraw = retVal.redraw || !changes['delay'].isFirstChange();
		}
		if (changes['interval']) {
			this.chartWrapper.chart.interval(this.interval);
			retVal.redraw = retVal.redraw || !changes['interval'].isFirstChange();
		}

		// Only redraw once if necessary
		if (retVal.resize) {
			this.chartWrapper.chart.resize();
		}
		if (retVal.redraw) {
			this.chartWrapper.chart.redraw();
		}
	}

}
