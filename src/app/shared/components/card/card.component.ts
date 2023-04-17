import { Component, Input } from '@angular/core';
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
 private shopCartService :ShoppingCartService;

 public addToCart(product:IProduct):void{
    this.shoppingCartService.addToShoppingCart(product);
 }
 public deleteFromCart(product:IProduct):void{
    this.shoppingCartService.deletFromShoppingCart(product);
 }
}
