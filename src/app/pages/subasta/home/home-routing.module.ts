import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { CanAdminGuard } from '../../auth/guard/can-admin.guard';
import { DataInformationGuard } from '../../auth/guard/data-information.guard';

const routes: Routes = [{ path: '', component: HomeComponent, canActivate: [DataInformationGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
