import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../models';
import { ShoppingCartService } from 'src/app/home/services/shopping-cart.service';
import { ShoppingCartComponent } from 'src/app/components/shopping-cart/shopping-cart.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  constructor(private shoppingCartService:ShoppingCartService){}

 @Input() product?:IProduct;
 @Input() action?:string;
 @Input() isInCart: boolean;

 @Output() addToCart: EventEmitter<IProduct> = new EventEmitter();
 @Output() onRemoveFromCart:EventEmitter<number> = new EventEmitter();

 public onAddToCart(product:IProduct):void{
  console.log("onAddToCart");
  this.addToCart.emit(product);
 }

 public removeFromCart(id:number):void{
  this.onRemoveFromCart.emit(id);
 }
 public addToCartnew(product:IProduct):void{
  this.product = {
    ...this.product,
    ...product
  }
    this.shoppingCartService.addToShoppingCart(this.product);
 }
 public addToWishList(product:IProduct):void{
    this.shoppingCartService.addToWishList(product);
 }
}
