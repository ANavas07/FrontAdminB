import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageLoginComponent } from './modules/auth/pages/page-login/page-login.component';
import { PageDashboardComponent } from './modules/administration/pages/page-dashboard/page-dashboard.component';
import { authGuard } from './utils/auth.guard';

/*@routes: Defino el enrutamiento que va a tener mi webApp
canLoad[]: previene la carga de la ruta hasta que se cumpla una condicion
loadchildren: es lazyload*/
const routes: Routes = [
  //login management
  // {path: '**', redirectTo: 'login', pathMatch: 'full'},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  // {path:'', component:PageLoginComponent},
  {path:'login', component:PageLoginComponent},
  //{path:'panel', component:PageDashboardComponent},
  {path:'panel', loadChildren:() =>import('./modules/administration/administration.module').then((m) => m.AdministrationModule), canActivate:[authGuard]},
  {path:'registro', loadChildren:() =>import('./modules/auth/auth.module').then((m)=>m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
