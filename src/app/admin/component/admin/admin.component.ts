import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/product/services/product.service';
import { ProductFormComponent } from 'src/app/shared/components/product-form/product-form.component';
import { IProduct } from 'src/app/shared/models';
import { AddProductComponent } from '../add-product/add-product.component';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],

})
export class AdminComponent implements AfterViewInit{
  public dataSource: MatTableDataSource<IProduct> = new MatTableDataSource;
 // @Input() dataSource?:IProduct[];
  public displayedColumns: string[] = [];
  public editProduct: IProduct[]=[];
  public columnDefs= [
    { field: 'id',filter:'ngIdFilter' },
    { field: 'price', filter: 'ngPriceFilter' }];
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  private _liveAnnouncer: any;
  public action?:string;
  constructor(private productService: ProductService,public dialog: MatDialog) {

  }

  ngOnInit(){
    this.productService.getProducts$().subscribe((data)=>{
      this.initTable(data.products);

    });
    this.productService.fetchProducts();
  }

  ngOnDestroy(): void {

  }
  ngAfterViewInit() {
    this.initFilterSortandPaging();
  }

  removeFromData(product :IProduct){
    console.log("removeFromData func");
    const index = this.dataSource.data.findIndex((el) => {
      return el === product;
    });
    console.log(index);
    this.dataSource.data.splice(index,1);
    this.dataSource._updateChangeSubscription();
  }

  applyFilterId(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(event);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private initFilterSortandPaging(){
    if(this.paginator && this.sort){
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  private initTable(data:IProduct[]):void{
    console.log("allproducts:",data);
    this.displayedColumns=['id', 'title', 'price', 'description','image','menu'];
    this.dataSource =new MatTableDataSource(data);
    this.initFilterSortandPaging();
    this.initFiltersForColumn();
  }

  sortChange(sortState: Sort){
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  initFiltersForColumn(){
    this.dataSource.filterPredicate =
      (data: IProduct, filter: string) =>
        (data.id.toString()).indexOf(filter) != -1;
  }

  initEditProduct(elem:IProduct[]):void{
    this.editProduct=elem;
    // const index = this.dataSource.data.findIndex((el) => {
    //   this.editProduct === elem;
    // });
    const dialogRef = this.dialog.open(EditProductComponent, {
      data:elem,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openDialog(): void {
    this.action ="add";
    console.log(this.action);

    const dialogRef = this.dialog.open(ProductFormComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
