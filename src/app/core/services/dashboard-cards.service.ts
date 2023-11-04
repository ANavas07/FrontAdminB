import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ICardsMenu{
  title:string;
  icon:string;
  color:string;
  textColor:string;
  modal:string;
}

@Injectable({
  providedIn: 'root'
})

export class DashboardCardsService {  
  //Service to admit comunication with components
  private _showCards= new Subject<boolean>();
  showCards= this._showCards.asObservable();

  
  private listCards: ICardsMenu[]=[
    {title:'Agregar usuario', icon:'person_add', color:'primary', textColor:'white', modal:'userModal'},
    {title:'Agregar Proveedor', icon:'apartment', color:'warning', textColor:'dark', modal:'addSupplier'},
    {title:'Agregar Producto', icon:'add_circle', color:'success', textColor:'white', modal:'addProduct'},
    {title:'Agregar Categoria', icon:'category', color:'info', textColor:'dark', modal:'addCategory'}
  ];
  
  constructor() { }

  getDashboardCards(){
    return [...this.listCards];
  }


}
