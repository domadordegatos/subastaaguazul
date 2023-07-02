import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthSvcService } from '../auth-svc.service';

@Injectable({
  providedIn: 'root'
})
export class DataInformationGuard implements CanActivate {

  constructor(private router: Router, private firestore: AngularFirestore, private authSvc:AuthSvcService) { }

  canActivate(): Observable<boolean> {
    // Obtén el ID del usuario que deseas verificar
    const userId = this.authSvc.usuario.uid;

    // Realiza la consulta a la base de datos de Firebase
    return this.firestore.collection('users').doc(userId).get().pipe(
      map((doc) => {
        // Comprueba si el documento existe en la colección
        if (doc.exists) {
          return true; // Usuario existe, permite la navegación
        } else {
          this.router.navigate(['/information']); // Usuario no existe, redirige a la página "information"
          return false; // No permite la navegación
        }
      }),
      catchError(() => {
        this.router.navigate(['/information']); // Error al consultar la base de datos, redirige a la página "information"
        return of(false); // No permite la navegación
      })
    );
  }
}