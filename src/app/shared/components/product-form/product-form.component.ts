import { Component, Input,Output } from '@angular/core';
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
}
