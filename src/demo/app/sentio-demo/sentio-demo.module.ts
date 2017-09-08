import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SentioDemoComponent } from './sentio-demo.component';
import { SentioDemoRoutingModule } from './sentio-demo-routing.module';

import { ChartsDemoModule } from './charts/charts-demo.module';
import { TimelinesDemoModule } from './timelines/timelines-demo.module';


@NgModule({
	imports: [
		CommonModule,
		RouterModule,

		SentioDemoRoutingModule,

		ChartsDemoModule,
		TimelinesDemoModule
	],
	declarations: [
		SentioDemoComponent
	],
	exports: [
		SentioDemoComponent
	]
})
export class SentioDemoModule { }
