import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectosComponent } from './directos.component';

const routes: Routes = [{path:'',component:DirectosComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectosRoutingModule { }
