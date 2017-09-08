import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SentioModule } from '../../../../sentio/sentio.module';

import { BasicDonutChartDemoComponent } from './donut/basic/basic-donut-chart-demo.component';
import { BasicMatrixChartDemoComponent } from './matrix/basic/basic-matrix-chart-demo.component';
import { BasicVerticalBarChartDemoComponent } from './vertical-bar/basic/basic-vertical-bar-chart-demo.component';


@NgModule({
	imports: [
		CommonModule,
		SentioModule
	],
	declarations: [
		BasicDonutChartDemoComponent,
		BasicMatrixChartDemoComponent,
		BasicVerticalBarChartDemoComponent
	],

	exports: [
		BasicDonutChartDemoComponent,
		BasicMatrixChartDemoComponent,
		BasicVerticalBarChartDemoComponent
	]
})
export class ChartsDemoModule { }
