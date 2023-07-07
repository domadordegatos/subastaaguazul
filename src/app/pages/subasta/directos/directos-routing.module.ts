import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectosComponent } from './directos.component';
import { EmailGuard } from '../../auth/guard/email-guard.guard';

const routes: Routes = [
  {path:'',component:DirectosComponent, canActivate:[EmailGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectosRoutingModule { }
