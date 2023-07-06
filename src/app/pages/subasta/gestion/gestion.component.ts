import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { userI } from 'src/app/shared/model/user.interface';
import { SubaSvcService } from '../suba-svc.service';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss']
})
export class GestionComponent implements OnInit {
  public allUsers$: Observable<userI[]>;
  public numerosPaleta: number[] = [];
  constructor(private subaSvc: SubaSvcService) { }

  ngOnInit(): void {
    this.allUsers$ = this.subaSvc.getAllUsers().pipe(
      tap(users => {
        this.numerosPaleta = users.map(user => user.paleta);
      })
    );
  }

  actualizar(id: string, paleta: number): void {
    console.log("1", id, "2", paleta);
    const result = this.subaSvc.updateUserPaleta(id,paleta);
      if(result){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Actualización exitosa',
          showConfirmButton: false,
          timer: 1500
        })
      }
  }

}
