import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliersAdministrationRoutingModule } from './suppliers-administration-routing.module';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { PageSuppliersComponent } from './pages/page-suppliers/page-suppliers.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations:[
    SuppliersComponent,
    PageSuppliersComponent
  ],
  imports: [
    CommonModule,
    SuppliersAdministrationRoutingModule,
    SharedModule
  ]
})
export class SuppliersAdministrationModule { }
