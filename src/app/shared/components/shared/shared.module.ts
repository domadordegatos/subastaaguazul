import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from '../banner/banner.component';
import { RouterModule } from '@angular/router';
import { UpsComponent } from '../ups/ups.component';

@NgModule({
  declarations: [UpsComponent,BannerComponent],
  imports: [CommonModule, RouterModule],
  exports: [UpsComponent,BannerComponent] // Exportamos el componente para que esté disponible en otros módulos
})
export class SharedModule { }
