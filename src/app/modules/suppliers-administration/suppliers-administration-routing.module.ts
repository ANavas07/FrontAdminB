import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageSuppliersComponent } from './pages/page-suppliers/page-suppliers.component';

const routes: Routes = [
  {path:"", component:PageSuppliersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersAdministrationRoutingModule { }
