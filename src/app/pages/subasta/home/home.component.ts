import {Component, OnInit } from '@angular/core';
import { SubaSvcService } from '../suba-svc.service';
import { AuthSvcService } from '../../auth/auth-svc.service';
import { userI } from 'src/app/shared/model/user.interface';
import { liveI } from 'src/app/shared/model/live.interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isButtonCLicked: boolean = false;
  tempSpan: boolean = false;
  idView:string = this.authSvc.usuario.uid; //busqueda de email
  user:userI;
  url: SafeResourceUrl;
  liveData: liveI;
  currentDate: Date;

  ngOnInit(): void {
    this.tempSpan = true;
    setTimeout(() => {
    this.tempSpan = false;
    }, 10000);
  }
  constructor(private subaSvc:SubaSvcService, private authSvc:AuthSvcService, private domSanitizer: DomSanitizer) {
    this.searchUserData();
    this.subaSvc.getLiveById().subscribe((data) => {
      this.liveData = data;
      if (this.liveData) {
        this.url = this.domSanitizer.bypassSecurityTrustResourceUrl(this.liveData.url);
      }
    });
    this.currentDate = new Date();
   }


  searchUserData():void{
    this.subaSvc.getUserById(this.idView).subscribe((user) => { this.user = user;  });
}

  onClickButton(): void {
    this.isButtonCLicked = true;
    setTimeout(() => {
      this.isButtonCLicked = false;
    }, 3000);
  }

  getButtonClasses() {
    return {
      'bg-red-500': this.isButtonCLicked,
      'ring-red-700': this.isButtonCLicked
    };
  }

}
