import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AutoBrushTimelineLineDemoComponent } from './charts/timeline/auto-brush/auto-brush-timeline-line-demo.component';
import { BasicDonutChartDemoComponent } from './charts/donut/basic/basic-donut-chart-demo.component';
import { BasicMatrixChartDemoComponent } from './charts/matrix/basic/basic-matrix-chart-demo.component';
import { BasicRealtimeTimelineLineDemoComponent } from './charts/timeline/realtime/basic/basic-realtime-timeline-line-demo.component';
import { BasicTimelineLineDemoComponent } from './charts/timeline/basic/basic-timeline-line-demo.component';
import { BasicVerticalBarChartDemoComponent } from './charts/vertical-bar/basic/basic-vertical-bar-chart-demo.component';
import { DynamicTimelineLineDemoComponent } from './charts/timeline/dynamic/dynamic-timeline-line-demo.component';
import { ResizeTimelineLineDemoComponent } from './charts/timeline/resize/resize-timeline-line-demo.component';


@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: 'sentio',
				children: [
					{
						path: '',
						pathMatch: 'full',
						redirectTo: '/'
					},
					{
						path: 'donut',
						component: BasicDonutChartDemoComponent
					},
					{
						path: 'matrix',
						component: BasicMatrixChartDemoComponent
					},
					{
						path: 'verticalBars',
						component: BasicVerticalBarChartDemoComponent
					},
					{
						path: 'timeline/basic',
						component: BasicTimelineLineDemoComponent
					},
					{
						path: 'timeline/resize',
						component: ResizeTimelineLineDemoComponent
					},
					{
						path: 'timeline/realtime-basic',
						component: BasicRealtimeTimelineLineDemoComponent
					},
					{
						path: 'timeline/auto-brush',
						component: AutoBrushTimelineLineDemoComponent
					},
					{
						path: 'timeline/dynamic',
						component: DynamicTimelineLineDemoComponent
					}
				]
			},
		])
	],
	exports: [
		RouterModule
	]
})
export class SentioDemoRoutingModule { }
