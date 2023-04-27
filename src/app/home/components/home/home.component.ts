import { Component, OnInit,OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/product/services/product.service';
import { IProduct, IResponseProducts } from 'src/app/shared/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{

  public products: IProduct[] = [];
  public allDetailsProducts?: IResponseProducts;
  public action:string ="home";

  constructor(private productService: ProductService) {}

  ngOnInit(){
    this.productService.getProducts$().subscribe((data)=>{
      console.log("allproducts:",data.products);
      this.allDetailsProducts= data;
      this.products = data['products'];
    });
    this.productService.fetchProducts();

  }

  ngOnDestroy(): void {

  }

  public isInCart(productId: number): Observable<boolean> {
    return this.productService.isProductInCart$(productId);
  }

  /*
  1. add input to app-card component
  2. inside app card display all product fields
  */

  public addToCart(product: IProduct): void {
    this.productService.addToCart(product);
  }

  public removeFromCart(id: number): void {
    this.productService.removeFromCart(id);
  }
}
