import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SentioDemoComponent } from './sentio-demo/sentio-demo.component';

const routes: Routes = [{
  path: '',
  component: SentioDemoComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
