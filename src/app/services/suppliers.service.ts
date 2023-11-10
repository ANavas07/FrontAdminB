import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'appsettings-json-reader';
import { Suppliers, SuppliersEdit } from '../interfaces/suppliers.interfaces';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {
  //publication and subscription pattern, i use that to refresh my data in the tables
  dataModifiedTable = new Subject<void>();

  //Contain the general url
  private myAppUrl: string;
  //contains the url of my appis
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = AppSettings.readAppSettings().environment.ENDPOINT;
    this.myApiUrl = 'api/suppliers/';
  }

  addSupplier(suppliers: Suppliers): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, suppliers).pipe(
      tap(() => {
        this.dataModifiedTable.next()
      })
    );
  }

  getSuppliers(): Observable<Suppliers[]> {
    return this.http.get<Suppliers[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  updateSuppliers(idSup: string, supplier: SuppliersEdit): Observable<any> {
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/${idSup}`, supplier).pipe(
      tap(() => {
        this.dataModifiedTable.next()
      })
    );;
  }

  deleteSuppliers(idSup: string): Observable<any> {
    return this.http.delete<string>(`${this.myAppUrl}${this.myApiUrl}/${idSup}`);
  }

}
