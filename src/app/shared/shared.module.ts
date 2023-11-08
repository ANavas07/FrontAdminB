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

//Use the datatable



@NgModule({
  declarations: [
    AsideComponent,
    NavbarComponent,
    SpinnerComponent,
    ModalUserComponent,
    ModalSupplierComponent,
    ModalCategoryComponent

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
    ModalCategoryComponent
  ]
})
export class SharedModule { }
