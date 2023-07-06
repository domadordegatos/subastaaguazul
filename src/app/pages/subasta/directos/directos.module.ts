import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectosRoutingModule } from './directos-routing.module';
import { DirectosComponent } from './directos.component';
import { SharedModule } from 'src/app/shared/components/shared/shared.module';


@NgModule({
  declarations: [
    DirectosComponent
  ],
  imports: [
    CommonModule,
    DirectosRoutingModule,
    SharedModule
  ]
})
export class DirectosModule { }
