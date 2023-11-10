import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageRegistrationComponent } from './pages/page-registration/page-registration.component';

const routes: Routes = [
  {path:'', component:PageRegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationProductsRoutingModule { }
