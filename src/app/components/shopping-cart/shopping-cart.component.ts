import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/core/services/auth-service.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { ShoppingCartService } from 'src/app/home/services/shopping-cart.service';
import { IProduct } from 'src/app/shared/models';
import { ExtantionComponent } from '../extantion/extantion.component';

let ELEMENT_DATA:IProduct[] =[];

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  public shopCartForm?:FormGroup[];
  public productsInCart :IProduct[];
  private _shopPords:IProduct[];

  constructor(
    private shoppingCartService:ShoppingCartService,
    public dialogExt:MatDialog,
    public dialogRef:MatDialogRef<ShoppingCartComponent>,
    private route: ActivatedRoute,
    private storageService:StorageService,
    ){}
  public ngOnInit(){
    this._shopPords = this.storageService.getData('shoppingCart');
    this.productsInCart = this._shopPords;
    console.log(this.productsInCart);
    ELEMENT_DATA = this.productsInCart['products'];
    console.log(ELEMENT_DATA);
  }


  displayedColumns: string[] = ['select','position','title', 'description', 'price'];
  dataSource = new MatTableDataSource<IProduct>(ELEMENT_DATA);
  selection = new SelectionModel<IProduct>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource['count'];
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource['products'].data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: IProduct): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  public onSubmit():void{
    console.log("submit shoppingcart");
    console.log( "Pay For Those Items : ",this.selection.selected[0]);

  }
  public deleteFromCart():void{
    console.log("deleteFromCart");
    console.log( "Delete This Item : ", this.selection.selected[0]);
    this.shoppingCartService.deletFromShoppingCart(this.selection.selected[0])

  }

  public openDeleteDialog():void{
    const dialogRef = this.dialogExt.open(ExtantionComponent, {
      data: {product:this.selection.selected, type:"Delete",msg:"Are You Sure Want Delete This Item?"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.deleteFromCart();
    });
  }
}
