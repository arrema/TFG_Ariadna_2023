import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ApiCall } from '../interfaces/product';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public http: HttpClient) { }

  loadProduct() : Observable <ApiCall>{
    
    return this.http
    .get<ApiCall>('https://dummyjson.com/products').pipe( 
      tap(res => console.log(res))
    );
  
  }
}
