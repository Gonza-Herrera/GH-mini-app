import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { UsersStore } from '../store/user.store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  standalone: true,
  selector: 'users-list-page',
  imports: [
    CommonModule,
    NgFor,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  store: UsersStore = inject(UsersStore);
  side: any;

  ngOnInit(): void {
    this.store.loadUsers();
  }

  track = (_: number, u: any) => u.id;

  open(u: any) {
    this.store.openSidebar(u);
  }

  prev() {
    this.store.page.update((p: number) => Math.max(1, p - 1));
  }

  next() {
    this.store.page.update((p: number) => p + 1);
  }
  
}
