import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardCardsService, ICardsMenu } from '../../../../core/services/dashboard-cards.service';
import { Products } from 'src/app/interfaces/products.interfaces';
import { ProductsService } from 'src/app/services/products.service';
import { ModalUserComponent } from 'src/app/shared/modal-user/modal-user.component';

// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //to have access to the modalComponent
  //@ViewChild(ModalUserComponent) modalComponent: ModalUserComponent;

  listCards:ICardsMenu[];
  listProducts: Products[] = [];

  constructor(private _dashboardService: DashboardCardsService,
    private _productService: ProductsService,
    private router: Router) {
      this.listCards=_dashboardService.getDashboardCards();
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this._productService.getProducts().subscribe(data => {
      this.listProducts = (data as any).productsList;
    })
  }

  selectModalCard(card:ICardsMenu){
    this.openModal(card.modal);
  }

  openModal(nameModal:string){
    const modalDiv= document.getElementById(nameModal);
    if(modalDiv != null){
      modalDiv.style.display='block';
    }
  }


  //tables funcionatility
  editProduct(item:Products){
      /*this.modalComponent.formAddUser.patchValue({
        idProduct: item.idProduct,
        idCatBelong: item.idCatBelong,
        productName: item.productName,
        productPrice: item.productPrice,
        stock: item.stock,
        available: item.available
      });*/
  }

  deleteProduct(idProduct:string){
    this._productService.deleteProductById(idProduct).subscribe(data =>{
      console.log(data)
      //to refresh the table
      this.getProducts();
    });
  }


}
