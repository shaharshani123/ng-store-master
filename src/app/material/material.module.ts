import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatMenuModule} from '@angular/material/menu';
import { NgImageBrowserModule } from 'ng-image-browser';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';



const modules :Array<any> = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatTableModule,
  MatTooltipModule,
  MatPaginatorModule,
  MatSortModule,
  MatMenuModule,
  NgImageBrowserModule,
  MatFormFieldModule,
  MatDialogModule,
  MatSelectModule

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...modules
  ],
  exports:modules
})
export class MaterialModule { }
