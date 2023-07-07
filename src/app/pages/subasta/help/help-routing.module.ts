import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpComponent } from './help.component';
import { DataInformationGuard } from '../../auth/guard/data-information.guard';

const routes: Routes = [{path:'',component:HelpComponent, canActivate: [DataInformationGuard]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpRoutingModule { }
