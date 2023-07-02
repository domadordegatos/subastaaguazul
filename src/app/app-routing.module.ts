import { CanAdminGuard } from './pages/auth/guard/can-admin.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnlyloggedGuard } from './pages/auth/guard/onlylogged.guard';
import { UpdateInformationModule } from './pages/subasta/update-information/update-information.module';
import { DataInformationGuard } from './pages/auth/guard/data-information.guard';

const routes: Routes = [
{ path: '', redirectTo:'/home', pathMatch: 'full' },
{ path: 'home', loadChildren: () => import('./pages/subasta/home/home.module').then(m=> m.HomeModule), canActivate: [CanAdminGuard]},
{ path: 'login', loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule) , canActivate: [OnlyloggedGuard] },
{ path: 'register', loadChildren: () => import('./pages/auth/register/register.module').then(m => m.RegisterModule) , canActivate: [OnlyloggedGuard]},
{ path: 'verification-email', loadChildren: () => import('./pages/auth/email-verification/email-verification.module').then(m => m.EmailVerificationModule), canActivate: [OnlyloggedGuard] },
{ path: 'forgot-password', loadChildren: () => import('./pages/auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) , canActivate: [OnlyloggedGuard] },
{ path: 'information', loadChildren: () => import('./pages/subasta/update-information/update-information.module').then(m => m.UpdateInformationModule), canActivate: [CanAdminGuard]},
/* { path: 'carru-cell/:id', loadChildren: () => import('./pages/carrucell/carrucell/carrucell.module').then(m => m.CarrucellModule) }, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }