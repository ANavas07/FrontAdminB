import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User, UserEdit } from 'src/app/interfaces/user.interfaces';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css']
})
export class ModalUserComponent {
  
  constructor(private toastr: ToastrService, private _userService: UserService,
    private router: Router, private _errorService: ErrorService, private formBuilder: FormBuilder) {
      this.formAddUser = this.formBuilder.group({
        "dniUser": ['', [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern(/^\d{1,10}$/),
        ], [
          this.validateCedula.bind(this)
        ]],
        "nameUser": ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/)]],
        "lastNameUser": ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/)]],
        "userName": ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z0-9ñÑ\s]*$/)]],
        "passwordUser": ['', [Validators.required, Validators.maxLength(15)]],
        "passwordUserValidator": ['', [Validators.required, Validators.maxLength(15)]],
      });
     }

    formAddUser: FormGroup;
  get userNameEmpty() {
    return this.formAddUser.get('userName') as FormControl;
  }

  get passwordEmpty() {
    return this.formAddUser.get('passwordUser') as FormControl;
  }

  get dniUserEmpty() {
    return this.formAddUser.get('dniUser') as FormControl;
  }

  get nameUserEmpty() {
    return this.formAddUser.get('nameUser') as FormControl;
  }

  get lastNameUserEmpty() {
    return this.formAddUser.get('lastNameUser') as FormControl;
  }

  get passwordValidatorEmpty() {
    return this.formAddUser.get('passwordUserValidator') as FormControl;
  }

  
  //--------------Validar cedula-------------
  validateCedula = (control: FormControl) => {
    const cedula: number = control.value as number;
  
    return new Promise((resolve) => {
      const cedulaString: string = cedula.toString(); // Convertir a cadena para mantener compatibilidad con la lógica existente
  
      if (cedulaString.length === 10) {
        const digito_region = +cedulaString.substring(0, 2);
  
        if (digito_region >= 1 && digito_region <= 24) {
          const ultimo_digito = +cedulaString.substring(9, 10);
          const pares =
            +cedulaString.substring(1, 2) +
            +cedulaString.substring(3, 4) +
            +cedulaString.substring(5, 6) +
            +cedulaString.substring(7, 8);
  
          let numero1 = +cedulaString.substring(0, 1) * 2;
          numero1 = numero1 > 9 ? numero1 - 9 : numero1;
  
          let numero3 = +cedulaString.substring(2, 3) * 2;
          numero3 = numero3 > 9 ? numero3 - 9 : numero3;
  
          let numero5 = +cedulaString.substring(4, 5) * 2;
          numero5 = numero5 > 9 ? numero5 - 9 : numero5;
  
          let numero7 = +cedulaString.substring(6, 7) * 2;
          numero7 = numero7 > 9 ? numero7 - 9 : numero7;
  
          let numero9 = +cedulaString.substring(8, 9) * 2;
          numero9 = numero9 > 9 ? numero9 - 9 : numero9;
  
          const impares = numero1 + numero3 + numero5 + numero7 + numero9;
  
          const suma_total = pares + impares;
          const primer_digito_suma = +String(suma_total).substring(0, 1);
          const decena = (primer_digito_suma + 1) * 10;
          const digito_validador = decena - suma_total;
  
          if ((digito_validador === 10 && ultimo_digito === 0) || digito_validador === ultimo_digito) {
            resolve(null); // Cédula válida
          } else {
            resolve({ invalidCedula: true }); // Cédula inválida
          }
        } else {
          resolve({ invalidRegion: true }); // Región inválida
        }
      } else {
        resolve({ invalidLength: true }); // Longitud inválida
      }
    });
  };
  
  //Here start my modal edit------

  get userNameEmptyE() {
    return this.formEditUser.get('userName') as FormControl;
  }

  get nameUserEmptyE() {
    return this.formEditUser.get('nameUser') as FormControl;
  }

  get lastNameUserEmptyE() {
    return this.formEditUser.get('lastNameUser') as FormControl;
  }
  
  formEditUser = new FormGroup({
    "dniUser": new FormControl({value:'', disabled:true}),
    "nameUser": new FormControl('', [Validators.required, Validators.maxLength(20) ,Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/)]),
    "lastNameUser": new FormControl('',  [Validators.required, Validators.maxLength(20) ,Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/)]),
    "userName": new FormControl('',  [Validators.required, Validators.maxLength(10) ,Validators.pattern(/^[a-zA-Z0-9ñÑ\s]*$/)]),
    "passwordUser": new FormControl('', Validators.required)
  })


  addUser(modalName:string){

    if (this.formAddUser.get('passwordUser')?.value != this.formAddUser.get('passwordUserValidator')?.value) {
      this.toastr.error('Los contraseñas ingresadas son distintas', 'Error!!');
      return;
    }

    const user:User={
      dniUser:this.formAddUser.get('dniUser')?.value || '',
      nameUser:this.formAddUser.get('nameUser')?.value || '',
      lastNameUser:this.formAddUser.get('lastNameUser')?.value || '',
      userName:this.formAddUser.get('userName')?.value || '',
      passwordUser:this.formAddUser.get('passwordUser')?.value || '',
      userRole:'',
    }

    this._userService.signIn(user).subscribe({
      next:(v) =>{
        this.toastr.success(v.msg, "Exito!");
        setTimeout(() => {
          this.closeModal(modalName);
        }, 1000); // wait 5 seconds before to close modal
      },
      error:(e: HttpErrorResponse)=>{
        this._errorService.msgError(e);
      }
    });

  }

  editUser(modalName:string){
    const idUser= this.formEditUser.get('dniUser')?.value||'';

    const user:UserEdit={
      nameUser:this.formEditUser.get('nameUser')?.value || '',
      lastNameUser:this.formEditUser.get('lastNameUser')?.value || '',
      userName:this.formEditUser.get('userName')?.value || '',
    }

    this._userService.editUser(idUser, user).subscribe({
      next:(v) =>{
        this.toastr.success(v.msg, "Exito!");
        setTimeout(() => {
          this.closeModal(modalName);
        }, 1000); // wait 5 seconds before to close modal
      },
      error:(e: HttpErrorResponse)=>{
        this._errorService.msgError(e);
      }
    })

  }


  //this is my function which one is gonna to communicate with other components onCloseModals
  closeModal(name: string) {
    const modalDiv = document.getElementById(name);
    if (modalDiv != null) {
      modalDiv.style.display = 'none';
      this.formAddUser.reset();
      this.formEditUser.reset();
    }
  }
  
  
}
