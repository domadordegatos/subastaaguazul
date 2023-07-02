import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthSvcService } from '../auth-svc.service';

@Injectable({
  providedIn: 'root'
})
export class OnlyloggedGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthSvcService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.afAuth.authState.pipe(
      take(1),
      map(authState => {
        if (authState && authState.emailVerified) {
          // El usuario está autenticado y el email está verificado
          this.router.navigate(['/home']); // Reemplaza '/otra-pagina' con la ruta a la que deseas redirigir en caso de que el usuario esté logado
          return false;
        } else {
          // El usuario no está autenticado o el email no está verificado
          return true;
        }
      })
    );
  }
}