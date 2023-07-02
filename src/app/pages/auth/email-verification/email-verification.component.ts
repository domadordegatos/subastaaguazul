import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthSvcService } from '../auth-svc.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {
  public user$: Observable<any> = this.authSvc.afAuth.user;
  constructor(private authSvc: AuthSvcService, private route:Router) { }

  ngOnInit(): void {
      console.log('ngOnInit');
  }

  onSendEmail(){
    Swal.fire({
      icon: 'success',
      title: 'Código enviado exitosamente',
      text: 'Serás redirigido a la página de inicio',
      timer: 3000
    })
    this.authSvc.sendVerificationEmail();
    this.route.navigate(['/login']);
  }

/*   ngOnDestroy(){
    this.authSvc.logout();
  } */

}