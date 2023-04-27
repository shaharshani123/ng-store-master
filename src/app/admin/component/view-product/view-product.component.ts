import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/product/services/product.service';
import { IProduct } from 'src/app/shared/models';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent {
  private sub:Subscription= new Subscription();
  public action:string="view";
  public product?:IProduct;
  public id:String='';

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data
    ){}
  ngOnInit(){
    console.log(this.data);
    this.product=this.data;
    // const id = this.data['id'];
    // this.productService.getProductsById$(Number(id)).subscribe((data:any)=>{
    //   console.log(data);
    //   this.product = data;
    //   console.log(this.product);
    // });
  }

  // ngOnDestroy(): void {
  //   this.sub.unsubscribe();
  // }
}
