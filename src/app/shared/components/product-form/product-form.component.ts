import { Component, Inject, Input,Output, forwardRef } from '@angular/core';
import { FormControl,FormGroupDirective, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { ProductService } from 'src/app/product/services/product.service';
import { IProduct } from '../../models';
import { Observable } from 'rxjs';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  // providers: [
  //   {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  // ]
})
export class ProductFormComponent {

  constructor(private productService:ProductService){}
  private _product : IProduct;
  public categoriesList:  FormControl;
  public categoryList: string[];
  @Input() action?:string;
  @Input() set product(product:IProduct){
    if(this.productForm){
      this.prePopulateForm(product);
    }
    this._product = product;
  }


  get product():IProduct{
    return this._product;
  }


  private prePopulateForm(product:IProduct){
    this.productForm.patchValue({
      title:  product.title,
      stock:  product.stock,
      price:  product.price,
      rating: product.rating,
      thumbnail: product.thumbnail,
      description: product.description,
      category:  product.category,
      brand:  product.brand,
    });
  }

  public productForm?:FormGroup;
  ngOnInit(){
    this.categoryList = this.productService.getProductCategory$();
    if(this.action == "edit"){
      console.log("Edit Mode!!");
      this.initEditForm(this.product);
    }
    if(this.action == "add"){
      this.categoriesList = new FormControl('');
      console.log("Add Mode!!");
      console.log(this.categoryList);
      this.initAddForm();
    }
  }

  public getControl(control:string):FormControl{
    return this.productForm.controls[control] as FormControl;

  }

  onNoClick(): void {
    //this.dialogRef.close();
  }

  ngOnChanges(){//if product changes outside

  }

  private initEditForm(product?:IProduct):void{
    console.log(this.product);
    this.productForm =new FormGroup({
      title:  new FormControl(product.title,[Validators.required]),
      stock:  new FormControl(product.stock,[Validators.required]),
      price:  new FormControl(product.price,[Validators.required]),
      rating:  new FormControl(product.rating,[Validators.required]),
      thumbnail:  new FormControl(product.thumbnail,[Validators.required]),
      description:  new FormControl(product.description,[Validators.required]),
      category:  new FormControl(product.category,[Validators.required]),
      brand:  new FormControl(product.brand,[Validators.required]),
    })
  }

  private initAddForm():void{
    this.productForm =new FormGroup({
      title:  new FormControl("",[Validators.required]),
      stock:  new FormControl(0,[Validators.required]),
      price:  new FormControl(0,[Validators.required]),
      rating:  new FormControl(0,[Validators.required]),
      thumbnail:  new FormControl(""),
      description:  new FormControl("",[Validators.required]),
      category:  new FormControl(this.categoryList,[Validators.required]),
      brand:  new FormControl("",[Validators.required]),
    })
  }

  public onSubmit():void{
    console.log(this.productForm);
    if(this.action == "edit"){
      this.product = {
        ...this.product,
        ...this.productForm.value
      }
      this.productService.setEditProduct(this.product,this.product.id);
    }
    if(this.action == "add"){
      console.log(this.productForm.value);
      this.productForm.value['id'] = this.productService.getProductsLength() +1;
      console.log(this.productForm.value);
      //this.product.id =this.productService.getProductsLength() +1;
      this.product = {
        ...this.product,
        ...this.productForm.value
      }
      this.productService.addProduct(this.product);
    }


  }
}
