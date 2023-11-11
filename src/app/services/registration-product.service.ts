import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Registration, RegistrationProducts } from '../interfaces/registration.interface';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from 'appsettings-json-reader';

@Injectable({
  providedIn: 'root'
})
export class RegistrationProductService {
  /*A BehaviorSubject is a special type of Observable in RxJS that holds a 
  current value and emits this current value to any new subscriber.*/
  private productRegistrationList= new BehaviorSubject<RegistrationProducts[]>([])
  
  //publication and subscription pattern, i use that to refresh my data in the tables
  dataModifiedTable= new Subject<void>();

  private myAppUrl: string;
  //contains the url of my appis
  private myApiUrl: string;


  constructor(private http: HttpClient) {
    this.myAppUrl = AppSettings.readAppSettings().environment.ENDPOINT;
    this.myApiUrl = 'api/productRegistration';
  }

  /*This method returns an Observable of the list of products. Any component can subscribe
  to this Observable to get updates to the product list.*/ 
  getProductRegistrationList(){
    return this.productRegistrationList.asObservable();
  }

  //to clear the list
  clearProductRegistrationList() {
    this.productRegistrationList.next([]); // Emite una nueva lista vacía
  }

  /*uses the next method to emit a new value for productList. This new value is a
  new array containing all the current products plus the new product.*/ 
  addProductRegistration(product:RegistrationProducts){
    const currentValue= this.productRegistrationList.value;
    this.productRegistrationList.next([...currentValue, product])
  }

  deleteProductRegistration(product:RegistrationProducts){
    const currentValue=this.productRegistrationList.value;
    const updateList= currentValue.filter(item => item !== product);
    this.productRegistrationList.next(updateList)
  }

  //only this one is used to call my api
  addRegistrationToDB(registration:Registration): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`,registration).pipe(
      tap(()=>{
          this.dataModifiedTable.next()
      })
    );
  }

  getDataRegistrationFromDB(): Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}`);
  }
  

}
