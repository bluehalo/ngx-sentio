import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SentioModule } from '../../../../sentio/sentio.module';
import { BasicDonutChartDemoComponent } from './basic/basic-donut-chart-demo.component';

@NgModule({
	imports: [
		CommonModule,
		SentioModule
	],
	declarations: [
		BasicDonutChartDemoComponent
	],
	exports: [
		BasicDonutChartDemoComponent
	]
})
export class DonutChartDemoModule { }
