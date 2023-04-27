import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from 'src/app/core/services/storage.service';
import { IProduct, IResponseProducts } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private storageService:StorageService) {  }
  private shoppingCart$: BehaviorSubject<IResponseProducts> = new BehaviorSubject({
    products:[],
    count:0
  });

  private wishList$: BehaviorSubject<IResponseProducts> = new BehaviorSubject({
    products:[],
    count:0
  });

  public shoppingCartList: IProduct[];

  public addToShoppingCart(product:IProduct):void{
    if(product){
      const existingData: IProduct[]=this.storageService.getData('shoppingCart');

      if(existingData){
        console.log(this.shoppingCart$.value['count']);
        this.shoppingCart$.value['products'][++this.shoppingCart$.value['count']] = product;
        this.storageService.setData('shoppingCart',this.shoppingCart$.value);
      }else{
        this.shoppingCart$.value['products'][0] = product;
        this.storageService.setData('shoppingCart',this.shoppingCart$.value);
      }
    }

  }



  public deletFromShoppingCart(productDelete:IProduct):void{
    // const existingData: IResponseProducts=this.storageService.getData('shoppingCart');
    console.log("indelete");
    const productIndex:number = this.shoppingCart$.value.products.findIndex(
      (product)=>{ return product === productDelete
      });
     this.shoppingCart$.value['products'].splice(productIndex,1);
     this.shoppingCart$.value['count']--;
     console.log(this.shoppingCart$.value);
     this.storageService.setData('shoppingCart',this.shoppingCart$.value);
  }

  public addToWishList(product:IProduct):void{
    if(product){
      const existingData: IProduct[]=this.storageService.getData('wishList');

      if(existingData){
        console.log("there is ExisitingData");
        console.log(this.wishList$.value['count']);
        this.shoppingCart$.value['products'][++this.wishList$.value['count']] = product;
        this.storageService.setData('wishList',this.wishList$.value);
      }else{
        console.log("there is ExisitingData");
        this.wishList$.value['products'][0] = product;
        this.storageService.setData('wishList',this.wishList$.value);
      }
    }

  }
}
