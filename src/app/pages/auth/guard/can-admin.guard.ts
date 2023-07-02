import { map, take, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthSvcService } from '../auth-svc.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class CanAdminGuard implements CanActivate {
  constructor(private router: Router,
    private afAuth: AngularFireAuth,
    private authService: AuthSvcService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.afAuth.authState
      .pipe(
        take(1),
        map(user => !!user && user.emailVerified), // Verifica si existe el usuario y si el email está verificado
        tap(authenticated => {
          if (!authenticated) {
            this.router.navigate(['/login']);
          }
        })
      );
  }
}
