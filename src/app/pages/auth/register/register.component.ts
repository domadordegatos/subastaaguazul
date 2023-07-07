import { Router } from '@angular/router';
import { AuthSvcService } from 'src/app/pages/auth/auth-svc.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { userI } from 'src/app/shared/model/user.interface';
import Swal from 'sweetalert2'
import { Observable } from 'rxjs';
import { SubaSvcService } from '../../subasta/suba-svc.service';
import { liveI } from 'src/app/shared/model/live.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  email:string;
  public viewUser:any = this.afAuth.usuario;
  liveData: liveI;
  constructor(private subaSvc:SubaSvcService, public afAuth:AuthSvcService ,private authSvc:AuthSvcService, private route:Router) {
  }

  ngOnInit(){
    this.subaSvc.getLiveById().subscribe((data) => { this.liveData = data });
  }
  
  onRegister() {
    const { email, password } = this.registerForm.value;
    try {
      const user = this.authSvc.register(email, password);
      if (user) {
        setTimeout(() => {
          this.route.navigate(['/verification-email'])
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  }

}
