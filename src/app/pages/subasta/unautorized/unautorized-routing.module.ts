import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnautorizedComponent } from './unautorized.component';
import { DataInformationGuard } from '../../auth/guard/data-information.guard';

const routes: Routes = [{ path: '', component: UnautorizedComponent, canActivate: [DataInformationGuard]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnautorizedRoutingModule { }
