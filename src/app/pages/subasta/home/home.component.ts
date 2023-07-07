import { Component } from '@angular/core';
import { SubaSvcService } from '../suba-svc.service';
import { AuthSvcService } from '../../auth/auth-svc.service';
import { userI } from 'src/app/shared/model/user.interface';
import { liveI } from 'src/app/shared/model/live.interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { pujaI } from 'src/app/shared/model/puja.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isButtonCLicked: boolean = false;
  tempSpan: boolean = false;
  idView: string = this.authSvc.usuario.uid; //busqueda de email
  user: userI;
  url: SafeResourceUrl;
  liveData: liveI;
  currentDate: Date;
  showSpan: boolean = false;
  time:number = 3000;
  pujaData: pujaI;

  ngOnInit(): void {
    this.subaSvc.getLastPuja().subscribe((data) => {
      this.pujaData = data;
      /* console.log("data", this.pujaData); */

      if (this.pujaData && this.pujaData.state && this.pujaData.win && !this.pujaData.notified) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Acabas de ganar este lote',
          showConfirmButton: false,
          timer: 2000
        });
        this.subaSvc.updateNotifiedPuja(this.pujaData.idUser);
      }
    });
    this.tempSpan = true;
    setTimeout(() => {
      this.tempSpan = false
      setTimeout(() => { this.tempSpan = null }, 500);
    }, 7000);
  }
  
  constructor(private subaSvc: SubaSvcService, private authSvc: AuthSvcService, private domSanitizer: DomSanitizer) {
    this.searchUserData();
    this.subaSvc.getLiveById().subscribe((data) => {
      this.liveData = data;
      if (this.liveData) {
        this.url = this.domSanitizer.bypassSecurityTrustResourceUrl(this.liveData.url);
      }
    });
    this.currentDate = new Date();
  }


  searchUserData(): void {
    this.subaSvc.getUserById(this.idView).subscribe((user) => { this.user = user; });
  }

  onClickButton() {
    if (!this.isButtonCLicked) {
      this.subaSvc.updatePujasState();
    }
    this.isButtonCLicked = true;
    this.showSpan = true;
    setTimeout(() => { this.isButtonCLicked = false; }, this.time);
    setTimeout(() => { this.showSpan = false  }, this.time);
  }

}
