import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SentioModule } from '../../../../sentio/sentio.module';
import { BasicMatrixChartDemoComponent } from './basic/basic-matrix-chart-demo.component';

@NgModule({
	imports: [
		BrowserModule,
		SentioModule
	],
	declarations: [
		BasicMatrixChartDemoComponent
	],
	exports: [
		BasicMatrixChartDemoComponent
	]
})
export class MatrixChartDemoModule { }
