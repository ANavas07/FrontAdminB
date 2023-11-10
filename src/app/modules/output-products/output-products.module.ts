import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutputProductsRoutingModule } from './output-products-routing.module';
import { OutputComponent } from './components/output/output.component';
import { PageOutputComponent } from './pages/page-output/page-output.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    OutputComponent,
    PageOutputComponent
  ],
  imports: [
    CommonModule,
    OutputProductsRoutingModule,
    SharedModule
  ]
})
export class OutputProductsModule { }
