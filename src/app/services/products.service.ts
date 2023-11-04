import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'appsettings-json-reader';
import { Observable } from 'rxjs';
import { Products } from '../interfaces/products.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

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

}
