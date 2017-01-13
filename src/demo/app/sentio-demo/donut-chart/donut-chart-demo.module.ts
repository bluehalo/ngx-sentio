import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SentioModule } from '../../../../sentio/sentio.module';
import { BasicDonutChartDemoComponent } from './basic/basic-donut-chart-demo.component';

@NgModule({
	imports: [
		BrowserModule,
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
