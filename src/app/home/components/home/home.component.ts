import { Component, OnInit,OnDestroy } from '@angular/core';
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
      this.allDetailsProducts =data;
      this.products = data.products;
    });
  }

  ngOnDestroy(): void {

  }
}
