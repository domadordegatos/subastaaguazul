import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectosRoutingModule } from './directos-routing.module';
import { DirectosComponent } from './directos.component';


@NgModule({
  declarations: [
    DirectosComponent
  ],
  imports: [
    CommonModule,
    DirectosRoutingModule
  ]
})
export class DirectosModule { }
