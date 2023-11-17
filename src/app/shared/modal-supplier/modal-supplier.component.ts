import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Suppliers, SuppliersEdit } from 'src/app/interfaces/suppliers.interfaces';
import { ErrorService } from 'src/app/services/error.service';
import { SuppliersService } from 'src/app/services/suppliers.service';

@Component({
  selector: 'app-modal-supplier',
  templateUrl: './modal-supplier.component.html',
  styleUrls: ['./modal-supplier.component.css']
})
export class ModalSupplierComponent {

  constructor(private toastr: ToastrService, private _supplierService: SuppliersService,
    private router: Router, private _errorService: ErrorService) { }

  get idSup(){
    return this.formAddSupplier.get('idSup') as FormControl
  }
  get nameSup(){
    return this.formAddSupplier.get('nameSup') as FormControl
  }
  get phoneSup(){
    return this.formAddSupplier.get('phoneSup') as FormControl
  }
  get addressSup(){
    return this.formAddSupplier.get('addressSup') as FormControl
  }
  get emailSup(){
    return this.formAddSupplier.get('emailSup') as FormControl
  }

  formAddSupplier = new FormGroup({
    "idSup": new FormControl('',  [Validators.required, Validators.maxLength(5) ,Validators.pattern(/^[a-zA-Z0-9]*$/)]),
    "nameSup": new FormControl('', [Validators.required, Validators.maxLength(20),Validators.pattern(/^[a-zA-ZñÑ\s]*$/)]),
    "phoneSup": new FormControl('', [Validators.required, Validators.pattern(/^\+?\d{1,17}$/)]),
    "addressSup": new FormControl('', [Validators.required, Validators.maxLength(25)]),
    "emailSup": new FormControl('', [Validators.required, Validators.email])
  });

  
  get idSupEdit(){
    return this.formEditSupplier.get('idSup') as FormControl
  }
  get nameSupEdit(){
    return this.formEditSupplier.get('nameSup') as FormControl
  }
  get phoneSupEdit(){
    return this.formEditSupplier.get('phoneSup') as FormControl
  }
  get addressSupEdit(){
    return this.formEditSupplier.get('addressSup') as FormControl
  }

  get emailSupEdit(){
    return this.formEditSupplier.get('emailSup') as FormControl
  }



  formEditSupplier = new FormGroup({
    "idSup": new FormControl({value:'', disabled:true}),
    "nameSup": new FormControl('', [Validators.required, Validators.maxLength(20),Validators.pattern(/^[a-zA-ZñÑ\s]*$/)]),
    "phoneSup": new FormControl('',  [Validators.required, Validators.pattern(/^\+?\d{1,17}$/)]),
    "addressSup": new FormControl('', Validators.required),
    "emailSup": new FormControl('', [Validators.required, Validators.email])
  });

  addSupplier(modalName:string){
    const supplier:Suppliers={
      idSup:this.formAddSupplier.get('idSup')?.value || '',
      nameSup:this.formAddSupplier.get('nameSup')?.value || '',
      phoneSup:this.formAddSupplier.get('phoneSup')?.value || '',
      addressSup:this.formAddSupplier.get('addressSup')?.value || '',
      emailSup:this.formAddSupplier.get('emailSup')?.value || ''
    }

    this._supplierService.addSupplier(supplier).subscribe({
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


  editSupplier(modalName:string){
    const idSup= this.formEditSupplier.get('idSup')?.value||'';

    const supplier:SuppliersEdit={
      nameSup:this.formEditSupplier.get('nameSup')?.value || '',
      phoneSup:this.formEditSupplier.get('phoneSup')?.value || '',
      addressSup:this.formEditSupplier.get('addressSup')?.value || '',
      emailSup:this.formEditSupplier.get('emailSup')?.value || ''
    }

    this._supplierService.updateSuppliers(idSup, supplier).subscribe({
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



  closeModal(name: string) {
    const modalDiv = document.getElementById(name);
    if (modalDiv != null) {
      modalDiv.style.display = 'none';
      this.formAddSupplier.reset();
      this.formEditSupplier.reset();
    }
  }


}
