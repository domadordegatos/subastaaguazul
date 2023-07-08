import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalInterface, Modal } from 'flowbite';
import { userI } from 'src/app/shared/model/user.interface';
import Swal from 'sweetalert2';
import { SubaSvcService } from '../suba-svc.service';
import { AuthSvcService } from '../../auth/auth-svc.service';
import { liveI } from 'src/app/shared/model/live.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-information',
  templateUrl: './update-information.component.html',
  styleUrls: ['./update-information.component.scss']
})
export class UpdateInformationComponent implements OnInit {
  private modal!: ModalInterface;
  usersForm: FormGroup; //formulario
  user:userI;//guardado de datos del usuario si los encuentra
  dataFind:boolean = false; //estado de los datos de usuario si los encuentra
  emailView:string = this.authSvc.usuario.email; //busqueda de email
  idView:string = this.authSvc.usuario.uid;
  liveData: liveI;

  constructor(private route: Router, private fb: FormBuilder, private subaSvc:SubaSvcService, private authSvc:AuthSvcService){
    this.searchUserData();
    this.initForm();
  }
  
  ngOnInit() {
    this.subaSvc.getLiveById().subscribe((data) => { this.liveData = data });
    const $modalElement: HTMLElement = document.querySelector('#defaultModal')!;
    this.modal = new Modal($modalElement);
    /* modal */
    /* carga de correo en interfaz */
  }

  searchUserData():void{
        this.subaSvc.getUserById(this.idView).subscribe((user) => {
          this.user = user;
          if (user) {
            this.usersForm.patchValue(this.user);
            this.dataFind = true;
            /* console.log("datafind",this.dataFind); */
            /* console.log('Usuario encontrado:', user); */
          } else {
              this.modal.show();/* console.log('Usuario no encontrado'); */
          }
        });
  }

  private initForm(): void{
    this.usersForm = this.fb.group({
      name: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      direcction:['', [Validators.required]],
      city:['', [Validators.required]],
      paleta:[0, [Validators.required]],
    })
    this.usersForm.get('paleta')?.disable();
  }

  onSave():void{
    /* console.log('saved', this.usersForm.value); */
    
    if(this.usersForm.valid){
      const userInformation = this.usersForm.value;
      const userId = this.authSvc.usuario.uid || null;
      Swal.fire({
        title: 'Estas seguro?',
        text: "Ya no podras actualizarlos",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, enviar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.subaSvc.onSaveUserInformation(userInformation,userId);
          this.messageExito();
          this.closeModal();
          setTimeout(() => {
            this.route.navigate(['/home']);
          }, 500);
        }
      })
      this.searchUserData();
    }
  }

  messageExito():void{
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Cambios Guardados!',
      showConfirmButton: false,
      timer: 3000
    })
  }

  closeModal():void{
    this.modal.hide();
  }
}
