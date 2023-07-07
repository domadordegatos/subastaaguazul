import { AngularFireAuth } from '@angular/fire/auth';
import { userI } from 'src/app/shared/model/user.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthSvcService } from '../auth-svc.service';
import Swal from 'sweetalert2'
import { liveI } from 'src/app/shared/model/live.interface';
import { SubaSvcService } from '../../subasta/suba-svc.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  liveData: liveI;

  constructor(private subaSvc:SubaSvcService, public afAuth:AngularFireAuth, private authSvc:AuthSvcService,private route:Router) {
  }
  
  ngOnInit(): void {
    this.subaSvc.getLiveById().subscribe((data) => { this.liveData = data });
    this.authSvc.redireccionarLogin();
  }

  async onLogin(){
    const { email, password } = this.loginForm.value;
    try{
      const user =  await this.authSvc.login(email,password);
      this.checkUserIsVerified(user);
    }catch(err){
      console.log("vista err",err);
    }
  }

  onClickGooogleLogin(){
    this.authSvc.signInGoogle()
    .then((res)=>{
      this.checkUserIsVerified(res)
      /* this.route.navigate(['/home']); */
    }).catch(err=>
      console.log(err.message));
  }

  private checkUserIsVerified(user:userI){
    if(user && user.emailVerified){
              /* console.log("user=>",user); */
              this.route.navigate(['/home']);
            }else if(user){
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No haz verificado tu correo, ve a tu bandeja y busca el link que te enviamos',
              })
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No estas registrado en la plataforma ve a la parte inferior a "Registrate"',
              })
            }
  }

}
