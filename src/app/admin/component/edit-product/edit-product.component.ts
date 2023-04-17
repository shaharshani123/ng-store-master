import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/product/services/product.service';
import { IProduct } from 'src/app/shared/models';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit,OnDestroy {
  private sub:Subscription= new Subscription();
  public product?:IProduct;
  public action: string="edit";
  public id?:String='';

  constructor(private productService: ProductService,private route: ActivatedRoute) {

  }

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id') || "";
    console.log(id);
    this.product = this.productService.getProdById(Number(id));

    console.log(this.product);

  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }




}
