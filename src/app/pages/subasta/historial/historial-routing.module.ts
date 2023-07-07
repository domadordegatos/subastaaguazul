import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorialComponent } from './historial.component';
import { DataInformationGuard } from '../../auth/guard/data-information.guard';

const routes: Routes = [{ path: '', component: HistorialComponent, canActivate: [DataInformationGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistorialRoutingModule { }
