import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SentioDemoModule } from './sentio-demo/sentio-demo.module';

@NgModule({
	imports: [
		BrowserModule,
		AppRoutingModule,
		SentioDemoModule
	],
	declarations: [
		AppComponent
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
