import { CanAdminGuard } from './pages/auth/guard/can-admin.guard';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { HeaderModule } from './shared/components/header/header.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { AuthSvcService } from './pages/auth/auth-svc.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BannerComponent } from './shared/components/banner/banner.component';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { UnautorizedComponent } from './pages/subasta/unautorized/unautorized.component';

registerLocaleData(localeEs);
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HeaderModule,
    FormsModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    ScrollingModule,
    CarouselModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }