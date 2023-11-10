import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationProductsRoutingModule } from './registration-products-routing.module';
import { RegistrationComponent } from './components/registration/registration.component';
import { PageRegistrationComponent } from './pages/page-registration/page-registration.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    RegistrationComponent,
    PageRegistrationComponent
  ],
  imports: [
    CommonModule,
    RegistrationProductsRoutingModule,
    SharedModule
  ]
})
export class RegistrationProductsModule { }
