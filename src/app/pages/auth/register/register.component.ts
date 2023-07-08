import { Router } from '@angular/router';
import { AuthSvcService } from 'src/app/pages/auth/auth-svc.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SubaSvcService } from '../../subasta/suba-svc.service';
import { liveI } from 'src/app/shared/model/live.interface';
import Swal from 'sweetalert2';

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
      this.authSvc.register(email, password)
        .then(() => {
          setTimeout(() => {
            this.route.navigate(['/verification-email']);
          }, 1000);
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            this.mensajeError('Este correo ya esta en uso')
          }else if(error.code === 'auth/invalid-email'){
            this.mensajeError('Correo invalido, por favor verifica los campos')
          }else {
            this.mensajeError('Error al registrar, llama a soporte')
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
  
  mensajeError(msg:string){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: msg,
    })
  }

}
