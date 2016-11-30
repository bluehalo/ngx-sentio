import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SentioModule } from '../../angular2-sentio/sentio.module';
import { AppComponent } from './app.component';

@NgModule({
	imports: [
		BrowserModule,
		SentioModule
	],
	declarations: [
		AppComponent
	],
	bootstrap: [ AppComponent ],
	providers: [ ]
})
export class AppModule { }
