import { ModuleWithProviders, NgModule } from '@angular/core';

import { DonutChartDirective } from './charts/donut/donut-chart.directive';
import { MatrixChartDirective } from './charts/matrix/matrix-chart.directive';
import { RealtimeTimelineDirective } from './charts/timeline/realtime/realtime-timeline.directive';
import { TimelineDirective } from './charts/timeline/timeline.directive';
import { VerticalBarChartDirective } from './charts/vertical-bar/vertical-bar-chart.directive';
import { AutoBrushTimelineDirective } from './charts/timeline/auto-brush/auto-brush-timeline.directive';

@NgModule({
	exports: [
		AutoBrushTimelineDirective,
		DonutChartDirective,
		MatrixChartDirective,
		RealtimeTimelineDirective,
		TimelineDirective,
		VerticalBarChartDirective,
	],
	declarations: [
		AutoBrushTimelineDirective,
		DonutChartDirective,
		MatrixChartDirective,
		RealtimeTimelineDirective,
		TimelineDirective,
		VerticalBarChartDirective
	]
})
export class SentioModule {

	static forRoot(): ModuleWithProviders {
		return { ngModule: SentioModule, providers: [] };
	}

}
