import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Registration, RegistrationProducts } from 'src/app/interfaces/registration.interface';
import { Suppliers } from 'src/app/interfaces/suppliers.interfaces';
import { User } from 'src/app/interfaces/user.interfaces';
import { ErrorService } from 'src/app/services/error.service';
import { RegistrationProductService } from 'src/app/services/registration-product.service';
import { SuppliersService } from 'src/app/services/suppliers.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  listUsers: User[] = [];
  listSuppliers: Suppliers[] = [];
  registrationList: RegistrationProducts[] = [];

  constructor(private _productService: RegistrationProductService,
    private _usersService: UserService, private _suppliersService: SuppliersService,
    private _errorService: ErrorService, private _registrationService: RegistrationProductService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this._productService.getProductRegistrationList().subscribe(productRegistrationList => {
      this.registrationList = productRegistrationList;
    })

    this.getSuppliersToRegister();
    this.getUsersToRegister();
  }


  getUsersToRegister() {
    this._usersService.getUsers().subscribe(data => {
      this.listUsers = (data as any).usersList;
    })
  }

  getSuppliersToRegister() {
    this._suppliersService.getSuppliers().subscribe(data => {
      this.listSuppliers = (data as any).suppliersList;
    })
  }

  //formGroups

  formAddRegistration = new FormGroup({
    "dniUserReceive": new FormControl('', Validators.required),
    "idSup": new FormControl('', Validators.required),
  });

  addRegister() {
    const register: Registration = {
      dniUserReceive: this.formAddRegistration.get('dniUserReceive')?.value || '',
      idSup: this.formAddRegistration.get('idSup')?.value || '',
      totalProduct: 0,
      totalCost: 0,
      products: this.registrationList
    }

    this._registrationService.addRegistrationToDB(register).subscribe({
      next: (v) => {
        this.toastr.success(v.msg, "Exito!");
        setTimeout(() => {
          this.formAddRegistration.reset();
          //
          this._productService.clearProductRegistrationList();
          //
        }, 1000); // wait 5 seconds before to close modal
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msgError(e);
      }
    });
  }

  deleteProductFromList(product: RegistrationProducts) {
    this._registrationService.deleteProductRegistration(product);
    this.toastr.success(`Producto ${product.idProductBelong} eliminado de la lista `, "Exito!");
  }


  openModal(nameModal: string) {
    const modalDiv = document.getElementById(nameModal);
    if (modalDiv != null) {
      modalDiv.style.display = 'block';
    }
  }

  cancel(){
    this.formAddRegistration.reset();
  }


}
