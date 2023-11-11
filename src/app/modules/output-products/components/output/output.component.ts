import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OutputProducts } from 'src/app/interfaces/output.interface';
import { RegistrationProducts } from 'src/app/interfaces/registration.interface';
import { User } from 'src/app/interfaces/user.interfaces';
import { ErrorService } from 'src/app/services/error.service';
import { OutputProductService } from 'src/app/services/output-product.service';
import { RegistrationProductService } from 'src/app/services/registration-product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent {


  listUsers: User[] = [];
  registrationList: RegistrationProducts[] = [];

  constructor(private _productService: RegistrationProductService,
    private _usersService: UserService, private _errorService: ErrorService, private _outputService: OutputProductService,
    private toastr: ToastrService, private _registrationService: RegistrationProductService) { }

  ngOnInit(): void {
    this._productService.getProductRegistrationList().subscribe(productRegistrationList => {
      this.registrationList = productRegistrationList;
      console.log(this.registrationList)
    })

    this.getUsersToRegister();
  }


  getUsersToRegister() {
    this._usersService.getUsers().subscribe(data => {
      this.listUsers = (data as any).usersList;
    })
  }


  //formGroups
  formAddOutput = new FormGroup({
    "dniUserReceive": new FormControl('', Validators.required)
  });

  addOutPut() {

    const output: OutputProducts = {
      dniUserOutput: this.formAddOutput.get('dniUserReceive')?.value || '',
      totalProducts: 0,
      totalCost: 0,
      products: this.registrationList
    }

    this._outputService.addOutputToDB(output).subscribe({
      next: (v) => {
        this.toastr.success(v.msg, "Exito!");
        console.log(v)
        setTimeout(() => {
          this.formAddOutput.reset();
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


}
