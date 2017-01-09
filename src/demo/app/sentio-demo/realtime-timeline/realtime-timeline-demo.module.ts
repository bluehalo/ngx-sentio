import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SentioModule } from '../../../../sentio/sentio.module';
import { BasicRealtimeTimelineLineDemoComponent } from './basic/basic-realtime-timeline-line-demo.component';

@NgModule({
	imports: [
		BrowserModule,
		SentioModule
	],
	declarations: [
		BasicRealtimeTimelineLineDemoComponent
	],
	exports: [
		BasicRealtimeTimelineLineDemoComponent
	]
})
export class RealtimeTimelineDemoModule { }
