import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from 'src/app/shared/components/product-form/product-form.component';
import { LoginComponent } from '../login/login.component';

@Component({
selector: 'app-header',
templateUrl: './header.component.html',
styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public dialog: MatDialog){}
public sidebarOpen: boolean = false;
public openSideBar(): void {
this.sidebarOpen = true;
}
public closeSidebar(): void {
this.sidebarOpen = false;
}
public openDialog(): void {
  const dialogRef = this.dialog.open(LoginComponent, {
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}
}
