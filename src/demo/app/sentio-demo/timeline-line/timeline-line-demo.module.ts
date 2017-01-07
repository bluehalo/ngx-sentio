import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SentioModule } from '../../../../sentio/sentio.module';
import { BasicTimelineLineDemoComponent } from './basic/basic-timeline-line-demo.component';

@NgModule({
	imports: [
		BrowserModule,
		SentioModule
	],
	declarations: [
		BasicTimelineLineDemoComponent
	],
	exports: [
		BasicTimelineLineDemoComponent
	]
})
export class TimelineLineDemoModule { }
