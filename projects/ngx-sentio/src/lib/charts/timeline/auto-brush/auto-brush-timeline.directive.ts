import { Directive, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange } from '@angular/core';

import { AutoBrushTimelineChart, chartAutoBrushTimeline, Series } from '@asymmetrik/sentio';

import { ChartWrapper } from '../../../util/chart-wrapper.util';
import { ResizeUtil } from '../../../util/resize.util';
import { TimelineUtil } from '../timeline.util';


@Directive({
	selector: 'sentioAutoBrushTimeline'
})
export class AutoBrushTimelineDirective
implements OnChanges, OnDestroy, OnInit {

	@Input('sentioData') data: any[];
	@Input('sentioSeries') series: Series[];

	@Input('sentioYExtent') yExtent: [ number, number ];

	@Input('sentioResizeWidth') resizeWidth: boolean;
	@Input('sentioResizeHeight') resizeHeight: boolean;

	@Input('sentioEdgeTrigger') edgeTrigger: number;
	@Input('sentioZoomInTrigger') zoomInTrigger: number;
	@Input('sentioZoomOutTrigger') zoomOutTrigger: number;
	@Input('sentiozoomTarget') zoomTarget: number;
	@Input('sentioMaxExtent') maxExtent: [ number, number ];
	@Input('sentioMinExtent') minExtent: number;
	@Input('sentioMinBrush') minBrush: number;


	// Chart Ready event
	@Output('sentioChartReady') chartReady = new EventEmitter<AutoBrushTimelineChart>();

	// Brush State
	@Input('sentioBrush') brushState: [ number, number ];
	@Output('sentioBrushChange') brushChange = new EventEmitter<[number, number]>();

	// Extent State
	@Output('sentioExtentChange') extentChange = new EventEmitter<[number, number]>();

	chartWrapper: ChartWrapper<AutoBrushTimelineChart>;
	resizeUtil: ResizeUtil;
	timelineUtil: TimelineUtil<AutoBrushTimelineChart>;


	constructor(el: ElementRef) {

		// Create the chart
		this.chartWrapper = new ChartWrapper<AutoBrushTimelineChart>(el, chartAutoBrushTimeline(), this.chartReady);

		// Set up the resizer
		this.resizeUtil = new ResizeUtil(el, (this.resizeHeight || this.resizeWidth));
		this.timelineUtil = new TimelineUtil<AutoBrushTimelineChart>(this.chartWrapper);

	}

	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		this.resizeUtil.resizeObserver.next(event);
	}

	ngOnInit() {

		// Initialize the chart
		this.chartWrapper.initialize();

		// register for the auto-brush events
		this.chartWrapper.chart.dispatch()
			.on('brushChange.internal', (brush: [ number, number ]) => {
				if (this.timelineUtil.didBrushChange(brush, this.brushState)) {
					setTimeout(() => { this.brushChange.emit(brush); });
				}
			})
			.on('extentChange.internal', (extent: [ number, number ]) => this.extentChange.emit(extent));

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
