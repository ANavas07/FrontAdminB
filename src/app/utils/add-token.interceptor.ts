import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorService } from '../services/error.service';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {

  constructor(private router: Router, private _errorService: ErrorService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //get the token
    const token = localStorage.getItem('token');
    if (token) {
      //clone header if i have a token
      request = request.clone({ setHeaders: { authorization: `Bearer ${token}` } })
    }

    //control, if i have an error 401 (unauthorized) return to login because i dont have a token
    //start with pipes
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this._errorService.msgError(error);
          this.router.navigate(['/login'])
        }
        return throwError(() => error);
      })
    );
  }
}
