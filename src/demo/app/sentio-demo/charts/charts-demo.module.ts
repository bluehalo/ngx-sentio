import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SentioModule } from '../../../../sentio/sentio.module';

import { BasicDonutChartDemoComponent } from './donut/basic/basic-donut-chart-demo.component';
import { BasicMatrixChartDemoComponent } from './matrix/basic/basic-matrix-chart-demo.component';
import { BasicVerticalBarChartDemoComponent } from './vertical-bar/basic/basic-vertical-bar-chart-demo.component';
import { BasicTimelineLineDemoComponent } from './timeline/basic/basic-timeline-line-demo.component';
import { ResizeTimelineLineDemoComponent } from './timeline/resize/resize-timeline-line-demo.component';
import { BasicRealtimeTimelineLineDemoComponent } from './timeline/realtime/basic/basic-realtime-timeline-line-demo.component';
import { AutoBrushTimelineLineDemoComponent } from './timeline/auto-brush/auto-brush-timeline-line-demo.component';


@NgModule({
	imports: [
		CommonModule,
		SentioModule
	],
	declarations: [
		BasicDonutChartDemoComponent,
		BasicMatrixChartDemoComponent,
		BasicVerticalBarChartDemoComponent,
		BasicTimelineLineDemoComponent,
		ResizeTimelineLineDemoComponent,
		BasicRealtimeTimelineLineDemoComponent,
		AutoBrushTimelineLineDemoComponent
	],

	exports: [
		BasicDonutChartDemoComponent,
		BasicMatrixChartDemoComponent,
		BasicVerticalBarChartDemoComponent,
		BasicTimelineLineDemoComponent,
		ResizeTimelineLineDemoComponent,
		BasicRealtimeTimelineLineDemoComponent,
		AutoBrushTimelineLineDemoComponent
	]
})
export class ChartsDemoModule { }
