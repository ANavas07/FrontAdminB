import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'appsettings-json-reader';
import { Observable, Subject, tap } from 'rxjs';
import { Products, ProductsEdit } from '../interfaces/products.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  //publication and subscription pattern, i use that to refresh my data in the tables
  dataModifiedTable= new Subject<void>();

  private myAppUrl: string;
  //contains the url of my appis
  private myApiUrl: string;


  constructor(private http: HttpClient) {
    this.myAppUrl = AppSettings.readAppSettings().environment.ENDPOINT;
    this.myApiUrl = 'api/products/';
  }

  getProducts(): Observable<Products[]>{
    return this.http.get<Products[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteProductById(idProduct:string): Observable<string>{
    return this.http.delete<string>(`${this.myAppUrl}${this.myApiUrl}/${idProduct}`)
  }

  addProduct(products: Products): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`,products).pipe(
      tap(()=>{
          this.dataModifiedTable.next()
      })
    );
  }

  updateProduct(idPro:string, product:ProductsEdit): Observable<any>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/${idPro}`,product).pipe(
      tap(()=>{
          this.dataModifiedTable.next()
      })
    );;
  }
  

}
