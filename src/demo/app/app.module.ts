import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SentioDemoModule } from './sentio-demo/sentio-demo.module';
import { AppComponent } from './app.component';

@NgModule({
	imports: [
		BrowserModule,
		SentioDemoModule
	],
	declarations: [
		AppComponent
	],
	bootstrap: [ AppComponent ],
	providers: [ ]
})
export class AppModule { }
