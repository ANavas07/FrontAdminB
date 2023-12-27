import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

//Interfaz donde defino los atributos del menu del aside
export interface IAsideMenu {
  title: string;
  url: string;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class AsideMenuService {

  //Funcionamiento del menu 
  /*Primero, crea un servicio Angular. Este servicio usará Subject de RxJS
  para permitir la comunicación entre componentes:*/
  private _showMenu= new Subject<boolean>();
  showMenu= this._showMenu.asObservable();


  //lista de Menu con todo lo que se requiere
  private asideMenuList: IAsideMenu[] = [
    { title: 'Panel Principal', url: '/panel', icon: 'grid_view' },
    { title: 'Gestión Usuarios', url: '/usuarios', icon: 'person_add' },
    { title: 'Gestión Proveedores', url: '/proveedores', icon: 'apartment' },
    { title: 'Gestión Categorías', url: '/categorias', icon: 'category' },
    { title: 'Registro De Productos', url: '/registro', icon: 'inventory' },
    { title: 'Salida De Productos', url: '/salida', icon: 'point_of_sale' },
    { title: 'Reportes', url: '/reportes', icon: 'report_gmailerrorred' }
  ];

  constructor() { }

  //@getAsideMenu(): me retorna una copiar de toda la lista
  getAsideMenu() {
    return [...this.asideMenuList];
  }

  //@getMenuByUrl: busca el menu por la URL especificada
  getAsideMenuByUrl(url:string):IAsideMenu{
    return this.asideMenuList.find(
      (menu)=>menu.url.toLowerCase() === url.toLowerCase()
    )as IAsideMenu
  }  

}
