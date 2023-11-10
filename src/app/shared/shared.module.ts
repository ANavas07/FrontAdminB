import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideComponent } from './aside/aside.component';
import {Route, RouterModule} from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ModalUserComponent } from './modal-user/modal-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalSupplierComponent } from './modal-supplier/modal-supplier.component';
import { ModalCategoryComponent } from './modal-category/modal-category.component';
import { ModalProductsComponent } from './modal-products/modal-products.component';
import { ModalRegistrationComponent } from './modal-registration/modal-registration.component';

//Use the datatable



@NgModule({
  declarations: [
    AsideComponent,
    NavbarComponent,
    SpinnerComponent,
    ModalUserComponent,
    ModalSupplierComponent,
    ModalCategoryComponent,
    ModalProductsComponent,
    ModalRegistrationComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports:[
    AsideComponent,
    NavbarComponent,
    SpinnerComponent,
    ModalUserComponent,
    ReactiveFormsModule,
    ModalSupplierComponent,
    ModalCategoryComponent,
    ModalProductsComponent,
    ModalRegistrationComponent
  ]
})
export class SharedModule { }
