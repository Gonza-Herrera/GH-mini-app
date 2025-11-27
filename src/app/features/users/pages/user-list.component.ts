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
import { PageEvent } from '@angular/material/paginator';
import { BasicPaginatorComponent } from '../../../shared/components/basic-paginator/basic-paginator.component';

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
    BasicPaginatorComponent,
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

  onPage(event: PageEvent) {
    this.store.page.set(event.pageIndex + 1);
  }
  
}
