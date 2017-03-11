import { ModuleWithProviders, NgModule } from '@angular/core';

import { DonutChartDirective } from './components/donut-chart.directive';
import { MatrixChartDirective } from './components/matrix-chart.directive';
import { RealtimeTimelineDirective } from './components/realtime-timeline.directive';
import { TimelineDirective } from './components/timeline.directive';
import { VerticalBarChartDirective } from './components/vertical-bar-chart.directive';

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
