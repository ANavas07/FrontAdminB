import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'appsettings-json-reader';
import { User, userLoginFields } from '../interfaces/user.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private myAppUrl: string;
  //contains the url of my appis
  private myApiUrl: string;


  constructor(private http: HttpClient) {
    this.myAppUrl= AppSettings.readAppSettings().environment.ENDPOINT;
    this.myApiUrl='api/users/';
  }

  //@signIn: returns an observable
  //i need to consume this service (i do it in login.components)
  signIn(user: User): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user);
  }

  login(user: userLoginFields): Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/userLogin`,user)
  }

}
