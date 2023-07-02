import { Component } from '@angular/core';
import { AuthSvcService } from './pages/auth/auth-svc.service';
import { Observable } from 'rxjs';
import { userI } from './shared/model/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public viewUser:any = this.afAuth.usuario;
  public verification:boolean;
  constructor(public afAuth:AuthSvcService) {}

  
}
