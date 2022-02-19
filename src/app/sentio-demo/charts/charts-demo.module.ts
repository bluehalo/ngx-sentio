import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SentioModule } from '../../../../projects/ngx-sentio/src/lib/ngx-sentio.module';

import { AutoBrushTimelineLineDemoComponent } from './timeline/auto-brush/auto-brush-timeline-line-demo.component';
import { BasicDonutChartDemoComponent } from './donut/basic/basic-donut-chart-demo.component';
import { BasicMatrixChartDemoComponent } from './matrix/basic/basic-matrix-chart-demo.component';
import { BasicRealtimeTimelineLineDemoComponent } from './timeline/realtime/basic/basic-realtime-timeline-line-demo.component';
import { BasicTimelineLineDemoComponent } from './timeline/basic/basic-timeline-line-demo.component';
import { BasicVerticalBarChartDemoComponent } from './vertical-bar/basic/basic-vertical-bar-chart-demo.component';
import { DynamicTimelineLineDemoComponent } from './timeline/dynamic/dynamic-timeline-line-demo.component';
import { ResizeTimelineLineDemoComponent } from './timeline/resize/resize-timeline-line-demo.component';


@NgModule({
	imports: [
		CommonModule,
		SentioModule
	],
	declarations: [
		AutoBrushTimelineLineDemoComponent,
		BasicDonutChartDemoComponent,
		BasicMatrixChartDemoComponent,
		BasicRealtimeTimelineLineDemoComponent,
		BasicTimelineLineDemoComponent,
		BasicVerticalBarChartDemoComponent,
		DynamicTimelineLineDemoComponent,
		ResizeTimelineLineDemoComponent
	],

	exports: [
		AutoBrushTimelineLineDemoComponent,
		BasicDonutChartDemoComponent,
		BasicMatrixChartDemoComponent,
		BasicRealtimeTimelineLineDemoComponent,
		BasicTimelineLineDemoComponent,
		BasicVerticalBarChartDemoComponent,
		DynamicTimelineLineDemoComponent,
		ResizeTimelineLineDemoComponent
	]
})
export class ChartsDemoModule { }
