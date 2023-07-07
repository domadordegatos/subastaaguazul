import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionComponent } from './gestion.component';
import { EmailGuard } from '../../auth/guard/email-guard.guard';

const routes: Routes = [{path:'', component: GestionComponent, canActivate:[EmailGuard]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionRoutingModule { }
