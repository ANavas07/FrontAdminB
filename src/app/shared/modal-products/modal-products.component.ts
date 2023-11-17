import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categories } from 'src/app/interfaces/categories.interfaces';
import { Products, ProductsEdit } from 'src/app/interfaces/products.interfaces';
import { CategoriesService } from 'src/app/services/categories.service';
import { ErrorService } from 'src/app/services/error.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-modal-products',
  templateUrl: './modal-products.component.html',
  styleUrls: ['./modal-products.component.css']
})
export class ModalProductsComponent {

  listCategories:Categories[]=[]

  constructor(private toastr: ToastrService, private _productsService: ProductsService,
    private router: Router, private _errorService: ErrorService, private _categoriesService:CategoriesService) { }

    ngOnInit(): void {
      this.getCategoriesToFillDataList();

      this._categoriesService.dataModifiedTable.subscribe(() => {
        this.getCategoriesToFillDataList()
      })
    }

  getCategoriesToFillDataList(){
    this._categoriesService.getCategories().subscribe(data => {
      this.listCategories = (data as any).categoriesList;
    })
  }  

  get idProduct(){
    return this.formAddProduct.get('idProduct') as FormControl
  }
  get productName(){
    return this.formAddProduct.get('productName') as FormControl
  }
  get productPrice(){
    return this.formAddProduct.get('productPrice') as FormControl
  }
  get stock(){
    return this.formAddProduct.get('stock') as FormControl
  }


  formAddProduct = new FormGroup({
    "idProduct": new FormControl('',  [Validators.required, Validators.maxLength(7) ,Validators.pattern(/^[a-zA-Z0-9ñÑ]*$/)]),
    "idCatBelong": new FormControl('', Validators.required),
    "productName": new FormControl('', [Validators.required, Validators.maxLength(20) ,Validators.pattern(/^[a-zA-Z0-9ñÑ\s]*$/)]),
    "productPrice": new FormControl('', [Validators.required,Validators.min(1), Validators.max(1000), Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
    "stock": new FormControl('', [Validators.required,Validators.min(0), Validators.max(5000), Validators.pattern(/^\d+$/)]),
    "available": new FormControl('', Validators.required),
  });

  get productNameEdit(){
    return this.formEditProduct.get('productName') as FormControl
  }
  get productPriceEdit(){
    return this.formEditProduct.get('productPrice') as FormControl
  }
  get stockEdit(){
    return this.formEditProduct.get('stock') as FormControl
  }


  formEditProduct = new FormGroup({
    "idProduct": new FormControl({ value: '', disabled: true }),
    "idCatBelong": new FormControl('', Validators.required),
    "productName": new FormControl('', [Validators.required, Validators.maxLength(20) ,Validators.pattern(/^[a-zA-Z0-9ñÑ\s]*$/)]),
    "productPrice": new FormControl('', [Validators.required, Validators.min(1), Validators.max(1000), Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
    "stock": new FormControl('', [Validators.required,Validators.min(0), Validators.max(5000), Validators.pattern(/^\d+$/)]),
    "available": new FormControl('', Validators.required),

  });

  addProducts(modalName: string) {

    const product: Products = {
      idProduct: this.formAddProduct.get('idProduct')?.value || '',
      idCatBelong: this.formAddProduct.get('idCatBelong')?.value || '',
      productName: this.formAddProduct.get('productName')?.value || '',
      productPrice: (this.formAddProduct.get('productPrice')?.value || 0) as number,
      stock:  (this.formAddProduct.get('stock')?.value || 0) as number,
      available: this.formAddProduct.get('available')?.value === 'true' || false
    }

    this._productsService.addProduct(product).subscribe({
      next: (v) => {
        this.toastr.success(v.msg, "Exito!");
        setTimeout(() => {
          this.closeModal(modalName);
        }, 1000); // wait 5 seconds before to close modal
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msgError(e);
      }
    });

  }

  
  editproduct(modalName:string){
    const idProduct= this.formEditProduct.get('idProduct')?.value||'';

    const product:ProductsEdit={
      idCatBelong:this.formEditProduct.get('idCatBelong')?.value || '',
      productName:this.formEditProduct.get('productName')?.value || '',
      productPrice:(this.formEditProduct.get('productPrice')?.value || 0) as number,
      stock:(this.formEditProduct.get('stock')?.value || 0) as number,
      available:this.formEditProduct.get('available')?.value === 'true' || false
    }

    this._productsService.updateProduct(idProduct, product).subscribe({
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
      this.formAddProduct.reset();
      this.formEditProduct.reset();
    }
  }

}
