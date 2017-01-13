import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SentioModule } from '../../../../sentio/sentio.module';
import { BasicVerticalBarChartDemoComponent } from './basic/basic-vertical-bar-chart-demo.component';

@NgModule({
	imports: [
		BrowserModule,
		SentioModule
	],
	declarations: [
		BasicVerticalBarChartDemoComponent
	],
	exports: [
		BasicVerticalBarChartDemoComponent
	]
})
export class VerticalBarChartDemoModule { }
