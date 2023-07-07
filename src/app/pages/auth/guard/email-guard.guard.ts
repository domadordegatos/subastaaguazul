import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthSvcService } from '../auth-svc.service';
import { liveI } from 'src/app/shared/model/live.interface';
import { SubaSvcService } from '../../subasta/suba-svc.service';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailGuard implements CanActivate {
  liveData$: Observable<liveI>; // Observable para obtener los datos en lugar de asignar directamente a una variable

  constructor(private router: Router, private authSvc: AuthSvcService, private subaSvc:SubaSvcService) {
    this.liveData$ = this.subaSvc.getLiveById();
  }

  canActivate(): Observable<boolean> {
    return this.liveData$.pipe(
      filter(liveData => !!liveData), // Filtrar para asegurarse de que liveData tenga un valor
      take(1), // Tomar solo el primer valor emitido
      // Verificar el correo electrónico
      map(liveData => {
        if (this.authSvc.usuario.email === liveData.email) {
          return true; // Permite el acceso si el correo es válido
        } else {
          this.router.navigate(['/home']); // Redirige a la ruta "home" si el correo es inválido
          return false;
        }
      })
    );
  }
}
