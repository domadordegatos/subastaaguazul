import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateInformationRoutingModule } from './update-information-routing.module';
import { UpdateInformationComponent } from './update-information.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UpdateInformationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    UpdateInformationRoutingModule
  ]
})
export class UpdateInformationModule { }
