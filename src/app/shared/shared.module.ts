import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { MaterialModule } from '../material/material.module';
import { ProductFormComponent } from './components/product-form/product-form.component';


@NgModule({
  declarations: [
    CardComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports:[CardComponent,ProductFormComponent]
})
export class SharedModule { }
