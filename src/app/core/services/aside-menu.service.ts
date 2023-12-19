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
  obtenerUsuarioToken() {
    const token = localStorage.getItem('token');
    if (token) {
      const payloadBase64 = token.split('.')[1];
      const decodedPayload = atob(payloadBase64);
      const payload = JSON.parse(decodedPayload);
      const userName = payload.userName;
      console.log('UserName:', userName);
      return userName
    } else {
      console.error('No se encontró el token en localStorage.');
      return null
    }
  }

  //lista de Menu con todo lo que se requiere
  private asideMenuAdminList: IAsideMenu[] = [
    { title: 'Panel', url: '/panel', icon: 'grid_view' },
    { title: 'Agregar Usuario', url: '/usuarios', icon: 'person_add' },
    { title: 'Agregar Proveedor', url: '/proveedores', icon: 'apartment' },
    { title: 'Gestion Categorias', url: '/categorias', icon: 'category' },
    { title: 'Registro De Productos', url: '/registro', icon: 'inventory' },
    { title: 'Salida De Productos', url: '/salida', icon: 'point_of_sale' },
    { title: 'Reportes', url: '/reportes', icon: 'report_gmailerrorred' }
  ];
  private asideMenuList: IAsideMenu[] = [
    { title: 'Panel', url: '/panel', icon: 'grid_view' },
    { title: 'Agregar Proveedor', url: '/proveedores', icon: 'apartment' },
    { title: 'Gestion Categorias', url: '/categorias', icon: 'category' },
    { title: 'Registro De Productos', url: '/registro', icon: 'inventory' },
    { title: 'Salida De Productos', url: '/salida', icon: 'point_of_sale' },
    { title: 'Reportes', url: '/reportes', icon: 'report_gmailerrorred' }
  ];

  constructor() { 
    
  }

  //@getAsideMenu(): me retorna una copiar de toda la lista
  getAsideMenu() {
    var usuario = this.obtenerUsuarioToken()
    if (usuario && usuario=="ariel") {
      return [...this.asideMenuAdminList];
    } else{
      return [...this.asideMenuList];
    }
    
  }

  //@getMenuByUrl: busca el menu por la URL especificada
  getAsideMenuByUrl(url:string):IAsideMenu{
    
    var usuario = this.obtenerUsuarioToken()
    if (usuario && usuario=="ariel") {
      return this.asideMenuAdminList.find(
        (menu)=>menu.url.toLowerCase() === url.toLowerCase()
      )as IAsideMenu
    } else{
      return this.asideMenuList.find(
        (menu)=>menu.url.toLowerCase() === url.toLowerCase()
      )as IAsideMenu
    }
    
  }  
  

}
