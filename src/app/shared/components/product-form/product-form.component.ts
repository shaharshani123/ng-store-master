import { Component, Inject, Input,Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/product/services/product.service';
import { IProduct } from '../../models';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {

  constructor(private productService:ProductService){}
  private _product : IProduct;
  @Input() set product(product:IProduct){
    if(this.productForm){
      this.prePopulateForm(product);
    }
    this._product = product;
  }


  get product():IProduct{
    return this._product;
  }


  @Input() action?:string;

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
    this.initForm(this.product);
  }

  public getControl(control:string):FormControl{
    return this.productForm.controls[control] as FormControl;

  }

  onNoClick(): void {
    //this.dialogRef.close();
  }

  ngOnChanges(){//if product changes outside

  }

  private initForm(product?:IProduct):void{
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

  public onSubmit():void{
    console.log(this.productForm);
    this.product = {
      ...this.product,
      ...this.productForm.value
    }
    //this.product=this._product;
    this.productService.setEditProduct(this.product,this.product.id);

  }
}
