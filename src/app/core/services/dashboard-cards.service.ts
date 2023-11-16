import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { OutputProductService } from 'src/app/services/output-product.service';
import { RegistrationProductService } from 'src/app/services/registration-product.service';

export interface ICardsMenu {
  title: string;
  icon: string;
  color: string;
  textColor: string;
  modal: string;
}

@Injectable({
  providedIn: 'root'
})

export class DashboardCardsService {
  //Service to admit comunication with components
  private _showCards = new Subject<boolean>();
  showCards = this._showCards.asObservable();


  private listCards: ICardsMenu[] = [
    { title: 'Agregar Producto', icon: 'add_circle', color: 'primary', textColor: 'white', modal: 'ProductModal' },
    { title: 'Agregar Categoria', icon: 'category', color: 'info', textColor: 'dark', modal: 'categoryModal' },
    { title: 'Agregar Proveedor', icon: 'apartment', color: 'warning', textColor: 'dark', modal: 'supplierModal' },
    { title: 'Agregar usuario', icon: 'person_add', color: 'success', textColor: 'white', modal: 'userModal' }
  ];

  private listCardsUsers: ICardsMenu[] = [
    { title: 'Agregar usuario', icon: 'person_add', color: 'success', textColor: 'white', modal: 'userModal' }
  ];

  private listCardsSuppliers: ICardsMenu[] = [
    { title: 'Agregar proveedor', icon: 'apartment', color: 'warning', textColor: 'dark', modal: 'supplierModal' }
  ];

  private listCardsCategories: ICardsMenu[] = [
    { title: 'Agregar Categoria', icon: 'category', color: 'info', textColor: 'dark', modal: 'categoryModal' }
  ];

  constructor() { }

  //this is for panel
  getDashboardCards() {
    return [...this.listCards];
  }

  getUsersCards() {
    return [...this.listCardsUsers];
  }

  getSuppliersCards() {
    return [...this.listCardsSuppliers];
  }

  getCategoriesCards() {
    return [...this.listCardsCategories];
  }


}
