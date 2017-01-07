import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SentioDemoComponent } from './sentio-demo/sentio-demo.component';

@NgModule({
	imports: [
		RouterModule.forRoot([
			{
				path: '',
				redirectTo: '/demo',
				pathMatch: 'full'
			},
			{
				path: 'src/demo',
				component: SentioDemoComponent
			}
		])
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule { }
