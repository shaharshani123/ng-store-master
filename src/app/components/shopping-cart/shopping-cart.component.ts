import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/core/services/auth-service.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { ShoppingCartService } from 'src/app/home/services/shopping-cart.service';
import { IProduct } from 'src/app/shared/models';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  public shopCartForm?:FormGroup;
  public _shopPords:IProduct[];
  @Input() set shoppingCart(product:IProduct[]){
    if(this.shopCartForm){
      this.prePopulateForm(product);
    }
    this._shopPords = product;
    console.log(this._shopPords);
  }

  private prePopulateForm(product:IProduct[]){
    for(let i=0; i<product.length;i++){
      this.shopCartForm.patchValue({
        title:  product[i].title,
        stock:  product[i].stock,
        price:  product[i].price,
        rating: product[i].rating,
        thumbnail: product[i].thumbnail,
        description: product[i].description,
        category:  product[i].category,
        brand:  product[i].brand,
      });
    }

  }

  constructor(private shoppingCartService:ShoppingCartService
    ,public dialogRef:MatDialogRef<ShoppingCartComponent>,private route: ActivatedRoute,private _formBuilder: FormBuilder){}
  public ngOnInit(){
    this.initEditForm(this._shopPords);

  }
  private initEditForm(product?:IProduct[]):void{
    console.log();
    // for(let i=0; i<product.length;i++){
    //   this.shopCartForm =new FormGroup({
    //         title:  new FormControl(product[i].title),
    //         stock:  new FormControl(product[i].stock),
    //         price:  new FormControl(product[i].price),
    //         rating:  new FormControl(product[i].rating),
    //         thumbnail:  new FormControl(product[i].thumbnail),
    //         description:  new FormControl(product[i].description),
    //         category:  new FormControl(product[i].category),
    //         brand:  new FormControl(product[i].brand),
    //       })
    // }
  //   this.productForm =new FormGroup({
  //     title:  new FormControl(product.title,[Validators.required]),
  //     stock:  new FormControl(product.stock,[Validators.required]),
  //     price:  new FormControl(product.price,[Validators.required]),
  //     rating:  new FormControl(product.rating,[Validators.required]),
  //     thumbnail:  new FormControl(product.thumbnail,[Validators.required]),
  //     description:  new FormControl(product.description,[Validators.required]),
  //     category:  new FormControl(product.category,[Validators.required]),
  //     brand:  new FormControl(product.brand,[Validators.required]),
  //   })
  // }
  }
}
