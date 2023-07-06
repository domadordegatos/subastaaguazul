import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/components/shared/shared.module';
import { UnautorizedComponent } from './unautorized.component';
import { UnautorizedRoutingModule } from './unautorized-routing.module';



@NgModule({
  declarations: [UnautorizedComponent],
  imports: [
    CommonModule,
    SharedModule,
    UnautorizedRoutingModule
  ]
})
export class UnautorizedModule { }
