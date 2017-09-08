import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SentioModule } from '../../../../sentio/sentio.module';

import { BasicTimelineLineDemoComponent } from './basic/basic-timeline-line-demo.component';
import { ResizeTimelineLineDemoComponent } from './resize/resize-timeline-line-demo.component';
import { BasicRealtimeTimelineLineDemoComponent } from './realtime/basic/basic-realtime-timeline-line-demo.component';
import { ZoomableTimelineLineDemoComponent } from './zoomable/zoomable-timeline-line-demo.component';

@NgModule({
	imports: [
		BrowserModule,
		SentioModule
	],
	declarations: [
		BasicTimelineLineDemoComponent,
		ResizeTimelineLineDemoComponent,
		BasicRealtimeTimelineLineDemoComponent,
		ZoomableTimelineLineDemoComponent
	],
	exports: [
		BasicTimelineLineDemoComponent,
		ResizeTimelineLineDemoComponent,
		BasicRealtimeTimelineLineDemoComponent,
		ZoomableTimelineLineDemoComponent
	]
})
export class TimelinesDemoModule { }
