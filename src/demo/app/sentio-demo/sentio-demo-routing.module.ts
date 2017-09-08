import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BasicDonutChartDemoComponent } from './charts/donut/basic/basic-donut-chart-demo.component';
import { BasicMatrixChartDemoComponent } from './charts/matrix/basic/basic-matrix-chart-demo.component';
import { BasicVerticalBarChartDemoComponent } from './charts/vertical-bar/basic/basic-vertical-bar-chart-demo.component';
import { BasicRealtimeTimelineLineDemoComponent } from './charts/timeline/realtime/basic/basic-realtime-timeline-line-demo.component';
import { BasicTimelineLineDemoComponent } from './charts/timeline/basic/basic-timeline-line-demo.component';
import { ResizeTimelineLineDemoComponent } from './charts/timeline/resize/resize-timeline-line-demo.component';
import { ZoomableTimelineLineDemoComponent } from './charts/timeline/zoomable/zoomable-timeline-line-demo.component';

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
						path: 'charts/donut',
						component: BasicDonutChartDemoComponent
					},
					{
						path: 'charts/matrix',
						component: BasicMatrixChartDemoComponent
					},
					{
						path: 'charts/verticalBars',
						component: BasicVerticalBarChartDemoComponent
					},
					{
						path: 'timelines/basic',
						component: BasicTimelineLineDemoComponent
					},
					{
						path: 'timelines/resize',
						component: ResizeTimelineLineDemoComponent
					},
					{
						path: 'timelines/realtime-basic',
						component: BasicRealtimeTimelineLineDemoComponent
					},
					{
						path: 'timelines/zoomable',
						component: ZoomableTimelineLineDemoComponent
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
