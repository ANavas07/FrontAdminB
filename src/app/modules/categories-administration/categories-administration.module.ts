import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesAdministrationRoutingModule } from './categories-administration-routing.module';
import { CategoriesComponent } from './components/categories/categories.component';
import { PageCategoriesComponent } from './pages/page-categories/page-categories.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CategoriesComponent,
    PageCategoriesComponent
  ],
  imports: [
    CommonModule,
    CategoriesAdministrationRoutingModule,
    SharedModule
  ]
})
export class CategoriesAdministrationModule { }
