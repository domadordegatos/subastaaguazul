import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnautorizedComponent } from './unautorized.component';

const routes: Routes = [{ path: '', component: UnautorizedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnautorizedRoutingModule { }
