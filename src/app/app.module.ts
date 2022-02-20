import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SentioDemoModule } from './sentio-demo/sentio-demo.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SentioDemoModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
