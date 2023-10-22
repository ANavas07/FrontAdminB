import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    PageDashboardComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    SharedModule
  ]
})
export class AdministrationModule { }
