import { Component } from '@angular/core';

@Component({
selector: 'app-header',
templateUrl: './header.component.html',
styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
public sidebarOpen: boolean = false;
public openSideBar(): void {
this.sidebarOpen = true;
}
public closeSidebar(): void {
this.sidebarOpen = false;
}
}
