import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/product/services/product.service';
import { IProduct } from 'src/app/shared/models';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {
  public product?:IProduct;
  public action: string="edit";

  constructor(private productService: ProductService,private route: ActivatedRoute) {

  }

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.getProductsById$(Number(id)).subscribe((data:any)=>{
      console.log(data);
      this.product = data;
    });

  }

  private initForm(data:IProduct[]):void{
    console.log("allproducts:",data);
  }
}
