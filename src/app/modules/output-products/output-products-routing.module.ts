import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageOutputComponent } from './pages/page-output/page-output.component';

const routes: Routes = [
  {path:'', component:PageOutputComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutputProductsRoutingModule { }
