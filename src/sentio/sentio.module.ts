import { ModuleWithProviders, NgModule } from '@angular/core';

import { DonutChartDirective } from './charts/donut/donut-chart.directive';
import { MatrixChartDirective } from './charts/matrix/matrix-chart.directive';
import { RealtimeTimelineDirective } from './charts/timeline/realtime/realtime-timeline.directive';
import { TimelineDirective } from './charts/timeline/timeline.directive';
import { VerticalBarChartDirective } from './charts/vertical-bar/vertical-bar-chart.directive';

@NgModule({
	exports: [
		DonutChartDirective,
		MatrixChartDirective,
		RealtimeTimelineDirective,
		TimelineDirective,
		VerticalBarChartDirective
	],
	declarations: [
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
