import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistorialRoutingModule } from './historial-routing.module';
import { HistorialComponent } from './historial.component';


@NgModule({
  declarations: [
    HistorialComponent
  ],
  imports: [
    CommonModule,
    HistorialRoutingModule
  ]
})
export class HistorialModule { }
