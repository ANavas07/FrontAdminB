import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Products } from 'src/app/interfaces/products.interfaces';
import { RegistrationProducts } from 'src/app/interfaces/registration.interface';
import { ErrorService } from 'src/app/services/error.service';
import { ProductsService } from 'src/app/services/products.service';
import { RegistrationProductService } from 'src/app/services/registration-product.service';

@Component({
  selector: 'app-modal-registration',
  templateUrl: './modal-registration.component.html',
  styleUrls: ['./modal-registration.component.css']
})
export class ModalRegistrationComponent {

  listProducts: Products[] = [];

  controlListRegistration: RegistrationProducts[] = [];

  constructor(private toastr: ToastrService, private _registrationService: RegistrationProductService,
    private router: Router, private _errorService: ErrorService,
    private _productService: ProductsService) { }


  ngOnInit(): void {
    this.getProductsToFillDataList();

    this._productService.dataModifiedTable.subscribe(() => {
      this.getProductsToFillDataList()
    })

  }

  getProductsToFillDataList() {

    this._productService.getProducts().subscribe(data => {
      this.listProducts = (data as any).productsList;
    })

  }

  formAddProductRegistration = new FormGroup({
    "idProduct": new FormControl('', Validators.required),
    "quantity": new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
  });

  formEditProductRegistration = new FormGroup({
    "idProduct": new FormControl({ value: '', disabled: true }),
    "quantity": new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
  });


  addRegistrationProduct(modalName: string) {
    const product: any = {
      idProductBelong: this.formAddProductRegistration.get('idProduct')?.value || '',
      productQty: (this.formAddProductRegistration.get('quantity')?.value || 0) as number
    }

    let idProductList = this.controlListRegistration.map(product => product.idProductBelong);

    if (idProductList.includes(product.idProductBelong)) {
      this.toastr.error(`${product.idProductBelong} Esta repetido`, "Error!");
    } else {
      this.controlListRegistration.push(product);
      this.toastr.success(`${product.idProductBelong} agregado`, "Exito!");
      this._registrationService.addProductRegistration(product);
      this.closeModal('ProductRegistrationModal');
    }

  }


  editproduct(modalName: string) {
    /*const idProduct = this.formEditProductRegistration.get('idProduct')?.value || '';

    const product: ProductsEdit = {
      idCatBelong: this.formEditProductRegistration.get('idCatBelong')?.value || '',
      productName: this.formEditProductRegistration.get('productName')?.value || '',
      productPrice: (this.formEditProductRegistration.get('productPrice')?.value || 0) as number,
      stock: (this.formEditProductRegistration.get('stock')?.value || 0) as number,
      available: this.formEditProductRegistration.get('available')?.value === 'true' || false
    }

    this._productsService.updateProduct(idProduct, product).subscribe({
      next: (v) => {
        this.toastr.success(v.msg, "Exito!");
        setTimeout(() => {
          this.closeModal(modalName);
        }, 1000); // wait 5 seconds before to close modal
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msgError(e);
      }
    })*/

  }


  closeModal(name: string) {
    const modalDiv = document.getElementById(name);
    if (modalDiv != null) {
      modalDiv.style.display = 'none';
      this.formAddProductRegistration.reset();
      this.formEditProductRegistration.reset();
    }
  }


}
