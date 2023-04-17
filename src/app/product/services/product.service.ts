import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Routes } from 'src/app/core/API';
import { StorageService } from 'src/app/core/services/storage.service';
import { IProduct, IResponseProducts } from 'src/app/shared/models';
//import { PRODUCTS_MOCK } from './products.mock';  no need after create API http requests



@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private isAuth$:Subject<boolean> = new Subject();
  constructor(private http: HttpClient, private storageService:StorageService ) { }

  private productsSubjects$: BehaviorSubject<IResponseProducts> = new BehaviorSubject({
    products:[]
  });

  public setEditProduct(product:IProduct, id:Number):void{
    this.refreshProductsFromStorage(product,id);
  }

  public getProductsLength():number{
    return this.storageService.getData('products').products.length;
  }

  public addProduct(product:IProduct):void{
    const existingData: IResponseProducts=this.storageService.getData('products');
    existingData.limit++;
    existingData.products.push(product);

    this.storageService.setData('products',existingData);
    this.fetchProducts();
  }

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

  public refreshProductsFromStorage(productChange:IProduct,id:Number):void{
    const existingData: IResponseProducts=this.storageService.getData('products');

    const productIndex:number = this.productsSubjects$.value.products.findIndex(
      (product)=>product.id ===id
    );

    existingData.products[productIndex] = productChange;

    this.storageService.setData('products',existingData);

    this.fetchProducts();
  }

  public getProductsById$(id:number):Observable<IProduct[]>{
    //return of(PRODUCTS_MOCK)
    return this.http.get<IProduct[]>(Routes["singleProduct"](id));
  }

  public getProductCategory$():string[]{
    //return of(PRODUCTS/CTEGORIES_MOCK)
    this.http.get<string[]>(Routes["getCategories"])
    .subscribe(data=>{
      this.storageService.setData('categories',data);
    });
    return this.storageService.getData('categories');
  }

  public getProdById(id:number):IProduct{
    this.fetchProducts();
    const productsList = this.productsSubjects$.value;

    const productIndex:number = this.productsSubjects$.value.products.findIndex(
      (product)=>product.id ===id
    );
    if(productsList.products[productIndex]){
      return productsList.products[productIndex];
    }else{
      return null;
    }

  }

}
