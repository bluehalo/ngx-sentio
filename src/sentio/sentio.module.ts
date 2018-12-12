import { ModuleWithProviders, NgModule } from '@angular/core';

import { DonutChartDirective } from './charts/donut/donut-chart.directive';
import { DynamicTimelineDirective } from './charts/timeline/dynamic/dynamic-timeline.directive';
import { MatrixChartDirective } from './charts/matrix/matrix-chart.directive';
import { RealtimeTimelineDirective } from './charts/timeline/realtime/realtime-timeline.directive';
import { TimelineDirective } from './charts/timeline/timeline.directive';
import { VerticalBarChartDirective } from './charts/vertical-bar/vertical-bar-chart.directive';
import { AutoBrushTimelineDirective } from './charts/timeline/auto-brush/auto-brush-timeline.directive';

@NgModule({
	exports: [
		AutoBrushTimelineDirective,
		DonutChartDirective,
		DynamicTimelineDirective,
		MatrixChartDirective,
		RealtimeTimelineDirective,
		TimelineDirective,
		VerticalBarChartDirective
	],
	declarations: [
		AutoBrushTimelineDirective,
		DonutChartDirective,
		DynamicTimelineDirective,
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
