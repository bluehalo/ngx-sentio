import { Directive, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange } from '@angular/core';
import { chartTimeline, PointEvents, Series, TimelineChart } from '@asymmetrik/sentio';

import { ChartWrapper } from '../../util/chart-wrapper.util';
import { ResizeUtil } from '../../util/resize.util';
import { TimelineUtil } from './timeline.util';

@Directive({
	selector: 'sentioTimeline'
})
export class TimelineDirective
	implements OnChanges, OnDestroy, OnInit {

	@Input('sentioData') data: any[];
	@Input('sentioSeries') series: Series[];
	@Input('sentioMarkers') markers: any[];

	@Input('sentioYExtent') yExtent: [ number, number ];
	@Input('sentioXExtent') xExtent: [ number, number ];

	@Input('sentioShowGrid') showGrid: boolean;
	@Input('sentioShowXGrid') showXGrid: boolean;
	@Input('sentioShowYGrid') showYGrid: boolean;
	@Input('sentioPointEvents') pointEvents: PointEvents;

	@Input('sentioResizeWidth') resizeWidth: boolean;
	@Input('sentioResizeHeight') resizeHeight: boolean;

	// Chart Ready event
	@Output('sentioChartReady') chartReady = new EventEmitter<TimelineChart>();

	// Enabled/Disable brushing the timeline
	@Input('sentioBrushEnabled') brushEnabled: boolean;

	// Brush state
	@Input('sentioBrush') brushState: [ number, number ];


	// Interaction events
	@Output('sentioBrushChange') brush = new EventEmitter<[number, number]>();

	@Output('sentioPointMouseover') pointMouseover: EventEmitter<any> = new EventEmitter<any>();
	@Output('sentioPointMouseout') pointMouseout: EventEmitter<any> = new EventEmitter<any>();
	@Output('sentioPointClick') pointClick: EventEmitter<any> = new EventEmitter<any>();

	@Output('sentioMarkerMouseover') markerMouseover: EventEmitter<any> = new EventEmitter<any>();
	@Output('sentioMarkerMouseout') markerMouseout: EventEmitter<any> = new EventEmitter<any>();
	@Output('sentioMarkerClick') markerClick: EventEmitter<any> = new EventEmitter<any>();


	chartWrapper: ChartWrapper<TimelineChart>;
	resizeUtil: ResizeUtil;
	timelineUtil: TimelineUtil<TimelineChart>;


	constructor(el: ElementRef) {

		// Create the chart
		this.chartWrapper = new ChartWrapper<TimelineChart>(el, chartTimeline(), this.chartReady);

		// Set up the resizer
		this.resizeUtil = new ResizeUtil(el, (this.resizeHeight || this.resizeWidth));
		this.timelineUtil = new TimelineUtil<TimelineChart>(this.chartWrapper);

	}

	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		this.resizeUtil.resizeObserver.next(event);
	}

	ngOnInit() {

		// Initialize the chart
		this.chartWrapper.initialize();

		// register for the point events
		this.chartWrapper.chart.dispatch()
			.on('pointClick.internal', (d: any) => this.pointClick.emit(d))
			.on('pointMouseover.internal', (d: any) => this.pointMouseover.emit(d))
			.on('pointMouseout.internal', (d: any) => this.pointMouseout.emit(d));

		// register for the marker events
		this.chartWrapper.chart.dispatch()
			.on('markerClick.internal', (d: any) => this.markerClick.emit(d))
			.on('markerMouseover.internal', (d: any) => this.markerMouseover.emit(d))
			.on('markerMouseout.internal', (d: any) => this.markerMouseout.emit(d));

		// register for the brush end event
		this.chartWrapper.chart.dispatch()
			.on('brushEnd.internal', (fs: [ number, number ]) => {
				// If the brush actually changed, emit the event
				if (this.timelineUtil.didBrushChange(fs, this.brushState)) {
					setTimeout(() => { this.brush.emit(fs); });
				}
			});

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

		// Set the brush (if it exists)
		if (null != this.brushState) {
			this.chartWrapper.chart.setBrush(this.brushState);
		}
	}

	ngOnDestroy() {
		this.resizeUtil.destroy();
	}

	ngOnChanges(changes: { [key: string]: SimpleChange }) {

		const retVal = this.timelineUtil.onChanges(changes);

		// Only redraw once if necessary
		if (retVal.resize) {
			this.chartWrapper.chart.resize();
		}
		if (retVal.redraw) {
			this.chartWrapper.chart.redraw();
		}

	}

}
