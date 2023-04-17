import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './admin/component/add-product/add-product.component';
import { AdminComponent } from './admin/component/admin/admin.component';
import { EditProductComponent } from './admin/component/edit-product/edit-product.component';
import { ViewProductComponent } from './admin/component/view-product/view-product.component';
import { HomeComponent } from './home/components/home/home.component';
import { ProductComponent } from './product/componenets/product/product.component';
import { ProductFormComponent } from './shared/components/product-form/product-form.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';


const routes: Routes = [
  {path:"",component:HomeComponent,pathMatch:'full'},
  {path:"admin",component:AdminComponent},
  {path:"prod",component:ProductComponent},
  {path:"admin/edit/:id",component:EditProductComponent},
  {path:"admin/add",component:AddProductComponent},
  {path:"admin/view/:id",component:ViewProductComponent},
  {path:"admin/shoppingCart",component:ShoppingCartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
