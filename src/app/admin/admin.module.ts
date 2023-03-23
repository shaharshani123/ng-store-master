import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './component/admin/admin.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { EditProductComponent } from './component/edit-product/edit-product.component';
import { RouterModule } from '@angular/router';
import { AddProductComponent } from './component/add-product/add-product.component';
import { ViewProductComponent } from './component/view-product/view-product.component';



@NgModule({
  declarations: [
    AdminComponent,
    EditProductComponent,
    AddProductComponent,
    ViewProductComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule,
  ],

})
export class AdminModule { }
