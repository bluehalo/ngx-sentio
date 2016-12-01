import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SentioDemoComponent } from './sentio-demo.component';
import { SentioModule } from '../../../sentio/sentio.module';

@NgModule({
	imports: [
		BrowserModule,
		SentioModule
	],
	declarations: [
		SentioDemoComponent
	],
	exports: [
		SentioDemoComponent
	],
	bootstrap: [ SentioDemoComponent ],
	providers: [ ]
})
export class SentioDemoModule { }
