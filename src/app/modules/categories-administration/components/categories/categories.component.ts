import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DashboardCardsService, ICardsMenu } from 'src/app/core/services/dashboard-cards.service';
import { Categories } from 'src/app/interfaces/categories.interfaces';
import { CategoriesService } from 'src/app/services/categories.service';
import { ErrorService } from 'src/app/services/error.service';
import { ModalCategoryComponent } from 'src/app/shared/modal-category/modal-category.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
 //to have access to the modalComponent
  @ViewChild(ModalCategoryComponent) modalComponent!:ModalCategoryComponent;

  
  listCards:ICardsMenu[];
  listCategories:Categories[]=[]

  constructor(private toastr: ToastrService,private _dashboardService: DashboardCardsService,
    private _categoriesService:CategoriesService,
    private router: Router, private _errorService: ErrorService) {
      this.listCards=_dashboardService.getCategoriesCards();
  }

  ngOnInit(): void {
    this.getCategories();

    //this is the event which is watching the different changes
    //for example when i insert a user o modified it (user.service.ts)
    this._categoriesService.dataModifiedTable.subscribe(() => {
      this.getCategories()
    })

  }

  getCategories() {
    this._categoriesService.getCategories().subscribe(data => {
      this.listCategories = (data as any).categoriesList;
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
    editCategory(nameModal: string, item: Categories) {
      this.modalComponent.formEditCategory.patchValue({
        idCat:item.idCat,
        nameCat: item.nameCat,
        descriptionCat: item.descriptionCat,
      });
      this.openModal(nameModal);
    }
  
    deleteCategory(idCat: string) {
      if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            this._categoriesService.deleteCategory(idCat).subscribe({
              next: (v) => {
                this.toastr.success(v.msg, "Exito!");
                this.getCategories();
              },
              error: (e: HttpErrorResponse) => {
                this._errorService.msgError(e);
              }
            });
      }
    }


}
