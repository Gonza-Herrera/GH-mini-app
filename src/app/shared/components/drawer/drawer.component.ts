import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSidenavModule, MatDrawer } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatIconModule, MatButtonModule],
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent {
  @ViewChild('drawer') drawer?: MatDrawer;

  @Input() opened = false;
  @Input() title = '';
  @Input() ariaLabel = 'Panel lateral';
  @Input() hasBackdrop = true;
  @Input() mode: 'over' | 'push' | 'side' = 'over';
  @Input() position: 'start' | 'end' = 'end';

  @Output() closed = new EventEmitter<void>();

  close() {
    this.drawer?.close();
  }
}
