import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/product/services/product.service';
import { IProduct } from 'src/app/shared/models';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent {
  public action:string="view";
  public product?:IProduct;

  constructor(private productService: ProductService,private route: ActivatedRoute) {

  }
  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.getProductsById$(Number(id)).subscribe((data:any)=>{
      console.log(data);
      this.product = data;
    });

  }

}
