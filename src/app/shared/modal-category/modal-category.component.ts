import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categories, CategoriesEdit } from 'src/app/interfaces/categories.interfaces';
import { CategoriesService } from 'src/app/services/categories.service';
import { ErrorService } from 'src/app/services/error.service';


@Component({
  selector: 'app-modal-category',
  templateUrl: './modal-category.component.html',
  styleUrls: ['./modal-category.component.css']
})
export class ModalCategoryComponent {

  
  constructor(private toastr: ToastrService, private _categoriesService: CategoriesService,
    private router: Router, private _errorService: ErrorService) { }


    get idCat(){
      return this.formAddCategory.get('idCat') as FormControl
    }
    get nameCat(){
      return this.formAddCategory.get('nameCat') as FormControl
    }
    get descriptionCat(){
      return this.formAddCategory.get('descriptionCat') as FormControl
    } 

  formAddCategory = new FormGroup({
    "idCat": new FormControl('',  [Validators.required, Validators.maxLength(5) ,Validators.pattern(/^[a-zA-Z0-9]*$/)]),
    "nameCat": new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-ZñÑ\s]*$/)]),
    "descriptionCat": new FormControl('', [Validators.required, Validators.maxLength(25), Validators.pattern(/^[a-zA-Z0-9ñÑ\s]*$/)]),
  });

  get idCatEdit(){
    return this.formEditCategory.get('idCat') as FormControl
  }
  get nameCatEdit(){
    return this.formEditCategory.get('nameCat') as FormControl
  }
  get descriptionCatEdit(){
    return this.formEditCategory.get('descriptionCat') as FormControl
  }

  formEditCategory = new FormGroup({
    "idCat": new FormControl({value:'', disabled:true}),
    "nameCat": new FormControl('', [Validators.required, Validators.maxLength(10) ,Validators.pattern(/^[a-zA-ZñÑ\s]*$/)]),
    "descriptionCat": new FormControl('', [Validators.required, Validators.maxLength(25), Validators.pattern(/^[a-zA-Z0-9ñÑ\s]*$/)]),
  });

  addCategory(modalName:string){
    const category:Categories={
      idCat:this.formAddCategory.get('idCat')?.value || '',
      nameCat:this.formAddCategory.get('nameCat')?.value || '',
      descriptionCat:this.formAddCategory.get('descriptionCat')?.value || ''
    }

    this._categoriesService.addCategory(category).subscribe({
      next:(v) =>{
        this.toastr.success(v.msg, "Exito!");
        setTimeout(() => {
          this.closeModal(modalName);
        }, 1000); // wait 5 seconds before to close modal
      },
      error:(e: HttpErrorResponse)=>{
        this._errorService.msgError(e);
      }
    });

  }


  editcategory(modalName:string){
    const idCat= this.formEditCategory.get('idCat')?.value||'';

    const category:CategoriesEdit={
      nameCat:this.formEditCategory.get('nameCat')?.value || '',
      descriptionCat:this.formEditCategory.get('descriptionCat')?.value || ''
    }

    this._categoriesService.updateCategory(idCat, category).subscribe({
      next:(v) =>{
        this.toastr.success(v.msg, "Exito!");
        setTimeout(() => {
          this.closeModal(modalName);
        }, 1000); // wait 5 seconds before to close modal
      },
      error:(e: HttpErrorResponse)=>{
        this._errorService.msgError(e);
      }
    })

  }



  closeModal(name: string) {
    const modalDiv = document.getElementById(name);
    if (modalDiv != null) {
      modalDiv.style.display = 'none';
      this.formAddCategory.reset();
      this.formEditCategory.reset();
    }
  }


}
