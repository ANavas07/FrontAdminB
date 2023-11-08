import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardCardsService, ICardsMenu } from '../../../../core/services/dashboard-cards.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user.interfaces';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/services/error.service';
import { ModalUserComponent } from 'src/app/shared/modal-user/modal-user.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  //to have access to the modalComponent
  @ViewChild(ModalUserComponent) modalComponent!: ModalUserComponent;

  listCards: ICardsMenu[];
  listUsers: User[] = [];

  constructor(private toastr: ToastrService, private _dashboardService: DashboardCardsService,
    private _userService: UserService,
    private router: Router, private _errorService: ErrorService) {
    this.listCards = _dashboardService.getUsersCards();
  }

  ngOnInit(): void {
    this.getUsers();

    //this is the event which is watching the different changes
    //for example when i insert a user o modified it (user.service.ts)
    this._userService.dataModifiedTable.subscribe(() => {
      this.getUsers()
    })

  }

  getUsers() {
    this._userService.getUsers().subscribe(data => {
      this.listUsers = (data as any).usersList;
    })
  }

  selectModalCard(card: ICardsMenu) {
    this.openModal(card.modal);
  }

  openModal(nameModal: string) {
    const modalDiv = document.getElementById(nameModal);
    if (modalDiv != null) {
      modalDiv.style.display = 'block';
    }
  }


  //tables funcionatility
  editUser(nameModal: string, item: User) {
    this.modalComponent.formEditUser.patchValue({
      dniUser: item.dniUser,
      nameUser: item.nameUser,
      lastNameUser: item.lastNameUser,
      userName: item.userName,
      passwordUser: item.passwordUser
    });
    this.openModal(nameModal);
  }

  deleteUser(idUser: string) {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
          this._userService.deleteUserById(idUser).subscribe({
            next: (v) => {
              this.toastr.success(v.msg, "Exito!");
              this.getUsers();
            },
            error: (e: HttpErrorResponse) => {
              this._errorService.msgError(e);
            }
          });
    }
  }



}
