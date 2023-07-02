import { userI } from 'src/app/shared/model/user.interface';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthSvcService } from 'src/app/pages/auth/auth-svc.service';
import { SubaSvcService } from 'src/app/pages/subasta/suba-svc.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [AuthSvcService]
})
export class HeaderComponent {
  public user$: Observable<userI | null> = this.authSvc.afAuth.user;
  public viewUser: any = this.authSvc.dataUser;
  isMenuExpanded = false;
  isButtonClicked: boolean = false;

  constructor(public authSvc: AuthSvcService, private route: Router, private subaSvc: SubaSvcService) { 
    
  }
  
  expandMenu(): void {
    this.isMenuExpanded = true;

    setTimeout(() => {
      this.isMenuExpanded = false;
      this.isButtonClicked = false;
    }, 4000); // 3000 ms = 3 segundos
  }

  onClickButton(): void {
    this.isButtonClicked = true;
  }

  async onLogout() {
    try {
      await this.authSvc.logout();
      this.route.navigate(['/login']);
      
    } catch (err) {
      console.log("err vista", err);
    }
  }

}