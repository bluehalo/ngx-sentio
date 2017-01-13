import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SentioDemoComponent } from './sentio-demo.component';

import { DonutChartDemoModule } from './donut-chart/donut-chart-demo.module';
import { MatrixChartDemoModule } from './matrix-chart/matrix-chart-demo.module';
import { RealtimeTimelineDemoModule } from './realtime-timeline/realtime-timeline-demo.module';
import { TimelineDemoModule } from './timeline/timeline-demo.module';
import { VerticalBarChartDemoModule } from './vertical-bar/vertical-bars-demo.module';


@NgModule({
	imports: [
		BrowserModule,
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
