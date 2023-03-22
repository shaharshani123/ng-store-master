import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './componenets/product/product.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ]
})
export class ProductModule { }
