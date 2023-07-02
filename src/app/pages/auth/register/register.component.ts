import { Router } from '@angular/router';
import { AuthSvcService } from 'src/app/pages/auth/auth-svc.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { userI } from 'src/app/shared/model/user.interface';
import Swal from 'sweetalert2'
import { Observable } from 'rxjs';

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
  constructor(public afAuth:AuthSvcService ,private authSvc:AuthSvcService, private route:Router) {
  }

  ngOnInit(){
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
