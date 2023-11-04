import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideComponent } from './aside/aside.component';
import {Route, RouterModule} from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ModalUserComponent } from './modal-user/modal-user.component';


@NgModule({
  declarations: [
    AsideComponent,
    NavbarComponent,
    SpinnerComponent,
    ModalUserComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    AsideComponent,
    NavbarComponent,
    SpinnerComponent,
    ModalUserComponent
  ]
})
export class SharedModule { }
