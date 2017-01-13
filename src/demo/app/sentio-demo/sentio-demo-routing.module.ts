import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BasicDonutChartDemoComponent } from './donut-chart/basic/basic-donut-chart-demo.component';
import { BasicMatrixChartDemoComponent } from './matrix-chart/basic/basic-matrix-chart-demo.component';
import { BasicVerticalBarChartDemoComponent } from './vertical-bar/basic/basic-vertical-bar-chart-demo.component';
import { BasicRealtimeTimelineLineDemoComponent } from './realtime-timeline/basic/basic-realtime-timeline-line-demo.component';
import { BasicTimelineLineDemoComponent } from './timeline/basic/basic-timeline-line-demo.component';

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: 'chart',
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
						path: 'timeline',
						component: BasicTimelineLineDemoComponent
					},
					{
						path: 'realtimeTimeline',
						component: BasicRealtimeTimelineLineDemoComponent
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
