import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
selector: 'app-sidebar',
templateUrl: './sidebar.component.html',
styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() isOpen: boolean = false;

  @Output() onCloseSidebar: EventEmitter<void> = new EventEmitter();

  public closeSidebar(): void {
    this.onCloseSidebar.emit();
  }
}
