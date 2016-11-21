import { NgModule } from '@angular/core';

import { DonutChartDirective } from './components/donut-chart.directive';
import { MatrixChartDirective } from './components/matrix-chart.directive';
import { RealtimeTimelineDirective } from './components/realtime-timeline.directive';
import { TimelineLineDirective } from './components/timeline-line.directive';
import { VerticalBarChartDirective } from './components/vertical-bar-chart.directive';

@NgModule({
	imports: [],
	exports: [
		DonutChartDirective,
		MatrixChartDirective,
		RealtimeTimelineDirective,
		TimelineLineDirective,
		VerticalBarChartDirective
	],
	declarations: [
		DonutChartDirective,
		MatrixChartDirective,
		RealtimeTimelineDirective,
		TimelineLineDirective,
		VerticalBarChartDirective
	],
	providers: [
	]
})
export class SentioModule { }
