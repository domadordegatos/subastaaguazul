import { CanAdminGuard } from './pages/auth/guard/can-admin.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnlyloggedGuard } from './pages/auth/guard/onlylogged.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'directo', loadChildren: () => import('./pages/subasta/directos/directos.module').then(m => m.DirectosModule), canActivate: [CanAdminGuard] },
  { path: 'forgot-password', loadChildren: () => import('./pages/auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule), canActivate: [OnlyloggedGuard] },
  { path: 'gestion', loadChildren: () => import('./pages/subasta/gestion/gestion.module').then(m => m.GestionModule), canActivate: [CanAdminGuard] },
  { path: 'help', loadChildren: () => import('./pages/subasta/help/help.module').then(m => m.HelpModule), canActivate: [CanAdminGuard] },
  { path: 'historial', loadChildren: () => import('./pages/subasta/historial/historial.module').then(m => m.HistorialModule), canActivate: [CanAdminGuard] },
  { path: 'home', loadChildren: () => import('./pages/subasta/home/home.module').then(m => m.HomeModule), canActivate: [CanAdminGuard] },
  { path: 'information', loadChildren: () => import('./pages/subasta/update-information/update-information.module').then(m => m.UpdateInformationModule), canActivate: [CanAdminGuard] },
  { path: 'login', loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule), canActivate: [OnlyloggedGuard] },
  { path: 'register', loadChildren: () => import('./pages/auth/register/register.module').then(m => m.RegisterModule), canActivate: [OnlyloggedGuard] },
  { path: 'unautorized', loadChildren: () => import('./pages/subasta/unautorized/unautorized.module').then(m => m.UnautorizedModule), canActivate: [CanAdminGuard] },
  { path: 'verification-email', loadChildren: () => import('./pages/auth/email-verification/email-verification.module').then(m => m.EmailVerificationModule), canActivate: [OnlyloggedGuard] },
  { path: 'viewtop', loadChildren: () => import('./pages/subasta/view-top/view-top.module').then(m => m.ViewTopModule)},
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }