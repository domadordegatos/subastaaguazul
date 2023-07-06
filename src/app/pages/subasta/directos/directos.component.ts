import { Component, OnInit } from '@angular/core';
import { SubaSvcService } from '../suba-svc.service';
import { liveI } from 'src/app/shared/model/live.interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable, combineLatest } from 'rxjs';
import { pujaI } from 'src/app/shared/model/puja.interface';
import { map, switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-directos',
  templateUrl: './directos.component.html',
  styleUrls: ['./directos.component.scss']
})
export class DirectosComponent implements OnInit {
  liveData: liveI; //data obtenida de firebase para sacar la url
  url: SafeResourceUrl; //url procesada de livedata
  topFive: Observable<pujaI[]>; //cinco mejores pujas
  public pujasWithUsers$: Observable<any[]>; //se agregan los datos de los usuarios a las 5 mejores pujas
  updateFlag = false; //variable para detecta actualizaciones

  constructor(private subaSvc: SubaSvcService, private domSanitizer: DomSanitizer) { }

  topClean(){

  }

  directoState(state:boolean){
    Swal.fire({
      title: 'Estas seguro de lo que quieres hacer?',
      showDenyButton: true,
      confirmButtonText: 'Lo estoy',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.subaSvc.updateLiveState(state);
        Swal.fire('Actualizado', '', 'success')
      }
    })
  }

  userWin(item:pujaI){
    this.subaSvc.updatePuja(item.id, { win: true }).then(() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Ganador notificado',
        showConfirmButton: false,
        timer: 800
      })
    }).catch((error) => {
      console.error("Error al actualizar el campo 'win'", error);
    });
  }

  ngOnInit(): void {
    this.topFive = this.subaSvc.getFivePujas();
    this.pujasWithUsers$ = this.topFive.pipe(
      switchMap(pujas => {
        const userIds = pujas.map(puja => puja.idUser);
        const userObservables = userIds.map(userId => this.subaSvc.getUserById(userId));
        return combineLatest(userObservables).pipe(
          map(users => {
            return pujas.map(puja => {
              const user = users.find(user => user.id === puja.idUser);
              this.updateFlag = true;
              setTimeout(() => { this.updateFlag = false; }, 300);
              return { ...puja, user };
            });
          })
        );
      })
    );
  
    /* this.pujasWithUsers$.subscribe(data => {
      console.log(data);
    }); */

    this.subaSvc.getLiveById().subscribe((data) => {
      this.liveData = data;
      if (this.liveData) {
        this.url = this.domSanitizer.bypassSecurityTrustResourceUrl(this.liveData.url);
      }
    });
  }
}
