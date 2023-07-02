import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalInterface, Modal } from 'flowbite';
import { Observable } from 'rxjs';
import { userI } from 'src/app/shared/model/user.interface';
import Swal from 'sweetalert2';
import { SubaSvcService } from '../suba-svc.service';
import { AuthSvcService } from '../../auth/auth-svc.service';

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


  constructor(private fb: FormBuilder, private subaSvc:SubaSvcService, private authSvc:AuthSvcService){
    this.searchUserData();
    this.initForm();
  }
  
  ngOnInit() {
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
      this.subaSvc.onSaveUserInformation(userInformation,userId);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Datos cargados con exito!',
        showConfirmButton: false,
        timer: 1500,
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
      timer: 1000
    })
  }

  closeModal():void{
    this.modal.hide();
  }
}
