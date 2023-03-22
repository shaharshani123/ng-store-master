import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, of } from 'rxjs';
import { Routes } from 'src/app/core/API';
import { IProduct, IResponseProducts } from 'src/app/shared/models';
//import { PRODUCTS_MOCK } from './products.mock';  no need after create API http requests



@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getProducts$():Observable<IResponseProducts>{
    //return of(PRODUCTS_MOCK)
    return this.http.get<IResponseProducts>(Routes["allProducts"]);
  }

  public getProductsById$(id:number):Observable<IProduct[]>{
    //return of(PRODUCTS_MOCK)
    return this.http.get<IProduct[]>(Routes["singleProduct"](id));
  }
}
