import { ContentChild, Directive, OnInit } from '@angular/core';

import { AutoBrushTimelineDirective } from '../auto-brush/auto-brush-timeline.directive';
import { TimelineDirective } from '../timeline.directive';
import { AutoBrushTimelineChart, TimelineChart } from '@asymmetrik/sentio';

@Directive({
	selector: '[sentioDynamicTimeline]'
})
export class DynamicTimelineDirective
implements OnInit {

	@ContentChild(TimelineDirective) timelineDirective: TimelineDirective;
	@ContentChild(AutoBrushTimelineDirective) autoBrushDirective: AutoBrushTimelineDirective;

	timeline: TimelineChart;
	autoBrush: AutoBrushTimelineChart;

	// Set the autoBrush timeline brush to the new value
	setBrush(newBrush: [ number, number ]) {
		this.autoBrush.setBrush(newBrush);
		this.autoBrush.redraw();
	}

	ngOnInit() {

		this.timeline = this.timelineDirective.chartWrapper.chart;
		this.autoBrush = this.autoBrushDirective.chartWrapper.chart;

		// Default config
		this.timeline
			.margin({ top: 16, right: 8, bottom: 24, left: 32 })
			.showGrid(true)
			.pointEvents('values')
			.brush(false);

		this.timeline.yExtent().overrideValue([ 0, undefined ]);
		this.timeline.xAxis().ticks(6);
		this.timeline.xGridAxis().ticks(6);

		this.autoBrush
			.margin({ top: 2, right: 8, bottom: 2, left: 32 });

		this.autoBrush.yExtent().overrideValue([ 0, undefined ]);

		// Auto Brush events
		this.autoBrush.dispatch()
			.on('brushChange.internalDynamicTimeline', (newBrush: [ number, number ]) => {
				this.setTimelineExtent(newBrush);
			});
	}

	// Set the timeline extent to the new value
	private setTimelineExtent(newExtent: [ number, number ]) {
		this.timeline.xExtent().overrideValue(newExtent);
		this.timeline.redraw();
	}

}
