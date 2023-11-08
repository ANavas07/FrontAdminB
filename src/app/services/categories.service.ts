import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'appsettings-json-reader';
import { Observable, Subject, tap } from 'rxjs';
import { Categories, CategoriesEdit } from '../interfaces/categories.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  //publication and subscription pattern, i use that to refresh my data in the tables
  dataModifiedTable= new Subject<void>();

  //Contain the general url
  private myAppUrl: string;
  //contains the url of my appis
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl= AppSettings.readAppSettings().environment.ENDPOINT;
    this.myApiUrl='api/categories/';
  }

  addCategory(categories: Categories): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, categories).pipe(
      tap(()=>{
          this.dataModifiedTable.next()
      })
    );
  }

  getCategories(): Observable<Categories[]>{
    return this.http.get<Categories[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
  
  updateCategory(idSup:string, Category:CategoriesEdit): Observable<any>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/${idSup}`,Category).pipe(
      tap(()=>{
          this.dataModifiedTable.next()
      })
    );;
  }

  deleteCategory(idSup:string): Observable<any>{
    return this.http.delete<string>(`${this.myAppUrl}${this.myApiUrl}/${idSup}`);
  }


}
