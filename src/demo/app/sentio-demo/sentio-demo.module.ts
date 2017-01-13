import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SentioDemoComponent } from './sentio-demo.component';
import { SentioDemoRoutingModule } from './sentio-demo-routing.module';

import { DonutChartDemoModule } from './donut-chart/donut-chart-demo.module';
import { MatrixChartDemoModule } from './matrix-chart/matrix-chart-demo.module';
import { RealtimeTimelineDemoModule } from './realtime-timeline/realtime-timeline-demo.module';
import { TimelineDemoModule } from './timeline/timeline-demo.module';
import { VerticalBarChartDemoModule } from './vertical-bar/vertical-bars-demo.module';


@NgModule({
	imports: [
		CommonModule,
		RouterModule,

		SentioDemoRoutingModule,

		DonutChartDemoModule,
		MatrixChartDemoModule,
		RealtimeTimelineDemoModule,
		TimelineDemoModule,
		VerticalBarChartDemoModule
	],
	declarations: [
		SentioDemoComponent
	],
	exports: [
		SentioDemoComponent
	]
})
export class SentioDemoModule { }
