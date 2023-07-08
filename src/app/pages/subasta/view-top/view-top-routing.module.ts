import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewTopComponent } from './view-top.component';

const routes: Routes = [{path:'',component:ViewTopComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewTopRoutingModule { }
