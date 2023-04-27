import { Component, EventEmitter, Inject, Input,Output, forwardRef } from '@angular/core';
import { FormControl,FormGroupDirective, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { ProductService } from 'src/app/product/services/product.service';
import { IProduct } from '../../models';
import { Observable } from 'rxjs';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  // providers: [
  //   {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  // ]
})
export class ProductFormComponent {

  constructor(private productService:ProductService,
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: IProduct){}
  private _product : IProduct;
  public categoriesList:  FormControl;
  public categoryList: string[];

  public isValidForm: boolean = false;
  public isFormInit: boolean = false;

  @Output() onSubmit2: EventEmitter<IProduct> = new EventEmitter();

  @Input() action?:string;
  @Input() set product(product:IProduct){

    if (!this.isFormInit) {
      this.initForm();

      this.isFormInit = true;
    }
    console.log('product changed', product);

    if(this.productForm){
      this.prePopulateForm(product);
    }
    this._product = product;
  }

  private initForm(product?: IProduct): void {
    if (this.isFormInit) return;
    //Initialize the product form
    if (product) {
    }
    this.productForm = new FormGroup({
      title: new FormControl('', []),
      description: new FormControl(''),
      category: new FormControl(''),
      image: new FormControl(''),
      price: new FormControl(''),
      rating: new FormGroup({
        count: new FormControl(''),
        rate: new FormControl(''),
      }),
      id: new FormControl(''),
    });
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
    if(this.action == "view"){
      console.log("View Mode!!");
      this.initViewForm(this.product);
    }

    if (this.dialogData) {
      this.product = this.dialogData;
    }
    this.initForm(this.product);

    setTimeout(() => {
      this.isValidForm = true;
    }, 3000);
  }

  public getControl(control:string):FormControl{
    return this.productForm.controls[control] as FormControl;

  }

  onNoClick(): void {
    //this.dialogRef.close();
  }

  ngOnChanges(){//if product changes outside

  }

  private initViewForm(product?:IProduct):void{
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

    this.product = {
      ...this.product,
      ...this.productForm.value,
    };
    if (this.dialogRef) {
      this.dialogRef.close(this.product);
    } else {
      this.onSubmit2.emit(this.product);
    }

    console.log('new value::::', this.product);




  }
  public submit(): void {
    // this.product.title = this.productForm.value.title;
    this.product = {
      ...this.product,
      ...this.productForm.value,
    };
    if (this.dialogRef) {
      this.dialogRef.close(this.product);
    } else {
      this.onSubmit2.emit(this.product);
    }

    console.log('new value::::', this.product);
  }

}
