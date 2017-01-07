import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SentioModule } from '../../../../sentio/sentio.module';
import { BasicRealtimeTimelineDemoComponent } from './basic/basic-realtime-timeline-demo.component';

@NgModule({
	imports: [
		BrowserModule,
		SentioModule
	],
	declarations: [
		BasicRealtimeTimelineDemoComponent
	],
	exports: [
		BasicRealtimeTimelineDemoComponent
	]
})
export class RealtimeTimelineDemoModule { }
