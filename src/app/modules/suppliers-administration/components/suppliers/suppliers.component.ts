import { Component, ViewChild } from '@angular/core';
import { DashboardCardsService, ICardsMenu } from "../../../../core/services/dashboard-cards.service"
import { Router } from '@angular/router';
import { Suppliers } from 'src/app/interfaces/suppliers.interfaces';
import { SuppliersService } from 'src/app/services/suppliers.service';
import { ModalSupplierComponent } from 'src/app/shared/modal-supplier/modal-supplier.component';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/services/error.service';


@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent {
  //to have access to the modalComponent
  @ViewChild(ModalSupplierComponent) modalComponent!: ModalSupplierComponent;


  listCards:ICardsMenu[];
  listSuppliers:Suppliers[]=[]

  constructor(private toastr: ToastrService,private _dashboardService: DashboardCardsService,
    private _suppliersService:SuppliersService,
    private router: Router, private _errorService: ErrorService) {
      this.listCards=_dashboardService.getSuppliersCards();
  }

  ngOnInit(): void {
    this.getSuppliers();

    
    //this is the event which is watching the different changes
    //for example when i insert a user o modified it (user.service.ts)
    this._suppliersService.dataModifiedTable.subscribe(() => {
      this.getSuppliers()
    })

  }

  getSuppliers() {
    this._suppliersService.getSuppliers().subscribe(data => {
      this.listSuppliers = (data as any).suppliersList;
      // console.log(data)
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
    editSupplier(nameModal: string, item: Suppliers) {
      this.modalComponent.formEditSupplier.patchValue({
        idSup: item.idSup,
        nameSup: item.nameSup,
        phoneSup: item.phoneSup,
        addressSup: item.addressSup,
        emailSup: item.emailSup
      });
      this.openModal(nameModal);
    }
  
    deleteSupplier(idSup: string) {
      if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            this._suppliersService.deleteSuppliers(idSup).subscribe({
              next: (v) => {
                this.toastr.success(v.msg, "Exito!");
                this.getSuppliers();
              },
              error: (e: HttpErrorResponse) => {
                this._errorService.msgError(e);
              }
            });
      }
    }


}
