import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, of, Subject } from 'rxjs';
import { Routes } from 'src/app/core/API';
import { StorageService } from 'src/app/core/services/storage.service';
import { IProduct, IResponseProducts } from 'src/app/shared/models';
//import { PRODUCTS_MOCK } from './products.mock';  no need after create API http requests



@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private http: HttpClient, private storageService:StorageService ) { }

  private productsSubjects$: Subject<IResponseProducts> = new Subject;

  public getProducts$():Observable<IResponseProducts>{
    return this.productsSubjects$.asObservable()
  }

  public fetchProducts():void{
    const existingData: IResponseProducts=this.storageService.getData('products');
    if(existingData){
      this.productsSubjects$.next(existingData);
    }else{
      //http
        this.http
        .get<IResponseProducts>(Routes["allProducts"])
        .subscribe(data=>{
          this.storageService.setData('products',data);
          this.productsSubjects$.next(data);
        });
    }

  }

  public getProductsById$(id:number):Observable<IProduct[]>{
    //return of(PRODUCTS_MOCK)
    return this.http.get<IProduct[]>(Routes["singleProduct"](id));
  }


}
