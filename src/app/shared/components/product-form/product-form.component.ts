import { Component, Inject, Input,Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProduct } from '../../models';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  @Input() product?:IProduct;
  @Input() action?:string;
  //@Output() protuctOut?:IProduct=this.product;

  constructor(
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IProduct[],
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
