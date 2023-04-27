import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './components/header/header.component';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { AdminModule } from './admin/admin.module';
import { NgImageBrowserModule } from 'ng-image-browser';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ExtantionComponent } from './components/extantion/extantion.component';
import { NgxsModule } from '@ngxs/store';
import { AppState } from './core/state/app-state';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    ShoppingCartComponent,
    ExtantionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HomeModule,
    MaterialModule,
    HttpClientModule,
    AdminModule,
    NgImageBrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot(AppState),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
