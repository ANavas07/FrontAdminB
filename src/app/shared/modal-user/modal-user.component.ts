import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user.interfaces';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css']
})
export class ModalUserComponent {

  constructor(private toastr: ToastrService, private _userService: UserService,
    private router: Router, private _errorService: ErrorService) { }


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

  formAddUser = new FormGroup({
    "dniUser": new FormControl('', Validators.required),
    "nameUser": new FormControl('', Validators.required),
    "lastNameUser": new FormControl('', Validators.required),
    "userName": new FormControl('', Validators.required),
    "passwordUser": new FormControl('', Validators.required),
    "passwordUserValidator": new FormControl('', Validators.required),
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
        this.toastr.success('El usuario fue registrado con exito', 'Usuario Registrado');
        setTimeout(() => {
          this.closeModal(modalName);
        }, 3000); // wait 5 seconds before to close modal
      },
      error:(e: HttpErrorResponse)=>{
        this._errorService.msgError(e);
      }
    });

  }


  //this is my function which one is gonna to communicate with other components onCloseModals
  closeModal(name: string) {
    const modalDiv = document.getElementById(name);
    if (modalDiv != null) {
      modalDiv.style.display = 'none';
    }
  }
}
