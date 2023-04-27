import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from 'src/app/shared/components/product-form/product-form.component';
import { LoginComponent } from '../login/login.component';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { IProduct } from 'src/app/shared/models';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
selector: 'app-header',
templateUrl: './header.component.html',
styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public dialog: MatDialog,private storageService:StorageService){}
public sidebarOpen: boolean = false;
public shoppingCart:IProduct[];
public openSideBar(): void {
this.sidebarOpen = true;
}
public closeSidebar(): void {
this.sidebarOpen = false;
}
public openDialog(): void {
  const dialogRef = this.dialog.open(LoginComponent, {
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}

public openShoppingCartDialog():void{
  this.shoppingCart = this.storageService.getData('shoppingCart');
  const dialogRef = this.dialog.open(ShoppingCartComponent, {
    data:{products:this.shoppingCart,type:"shopping_cart"}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}
public openWishListDialog():void{
  this.shoppingCart = this.storageService.getData('wishList');
  const dialogRef = this.dialog.open(ShoppingCartComponent, {
    data:{products:this.shoppingCart,type:"wishList"}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}
}
