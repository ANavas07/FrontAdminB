import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'appsettings-json-reader';
import { Observable, Subject, tap } from 'rxjs';
import { OutputProducts } from '../interfaces/output.interface';

@Injectable({
  providedIn: 'root'
})
export class OutputProductService {
  //publication and subscription pattern, i use that to refresh my data in the tables
  dataModifiedTable= new Subject<void>();

  private myAppUrl: string;
  //contains the url of my appis
  private myApiUrl: string;


  constructor(private http: HttpClient) {
    this.myAppUrl = AppSettings.readAppSettings().environment.ENDPOINT;
    this.myApiUrl = 'api/productOutput/';
  }

  addOutputToDB(outOut:OutputProducts): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`,outOut).pipe(
      tap(()=>{
          this.dataModifiedTable.next()
      })
    );
  }

  getDataOutputFromDB(): Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}`);
  }


}
