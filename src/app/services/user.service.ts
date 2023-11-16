import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'appsettings-json-reader';
import { User, UserEdit, UserLoginFields } from '../interfaces/user.interfaces';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //publication and subscription pattern, i use that to refresh my data in the tables
  dataModifiedTable= new Subject<void>();

  //Contain the general url
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
    //In this code, pipe and tap are RxJS operators. tap is used to perform side effects
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user).pipe(
      tap(()=>{
          this.dataModifiedTable.next()
      })
    );
  }

  login(user: UserLoginFields): Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/userLogin`,user)
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
  
  deleteUserById(idUser:string):Observable<any>{
    return this.http.delete<string>(`${this.myAppUrl}${this.myApiUrl}/${idUser}`);
  }

  editUser(idUser:string, user:UserEdit):Observable<any>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/${idUser}`,user).pipe(
      tap(()=>{
          this.dataModifiedTable.next();
      })
    );
  }

}
