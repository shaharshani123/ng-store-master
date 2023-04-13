import { Component } from '@angular/core';
import { IProduct } from 'src/app/shared/models';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  public product?:IProduct;
  public action:string ="add";
}
