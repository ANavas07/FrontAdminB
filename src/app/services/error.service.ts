import { HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private toastr:ToastrService) { }

  msgError(e:HttpErrorResponse){
    if(e.error.msg){
      this.toastr.error(e.error.msg, "Error!");
    }else{
      this.toastr.error("Uuups ocurrio un error, Comuniquese con el admin", "Error!");
    }
  }
}
