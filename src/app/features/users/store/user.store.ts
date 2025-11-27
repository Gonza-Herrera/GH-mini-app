import { Injectable, signal, computed } from '@angular/core';
import { UsersService } from '../services/user.service';
import { firstValueFrom } from 'rxjs';
import { User, Post } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UsersStore {
  constructor(private api: UsersService) {}

  // state
  users = signal<User[]>([]);
  query = signal<string>('');
  company = signal<string>('all');
  page = signal<number>(1);
  readonly pageSize = 5;

  selectedUser = signal<User | null>(null);
  lastPosts = signal<Post[] | null>(null);

  // derivados
  companies = computed(() => {
    const set = new Set(
      this.users()
        .map((u) => u.company?.name)
        .filter(Boolean)
    );
    return ['all', ...Array.from(set)] as string[];
  });

  filtered = computed(() => {
    const q = this.query().toLowerCase().trim();
    const c = this.company();
    return this.users().filter((u) => {
      const byText = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
      const byCompany = c === 'all' || u.company?.name === c;
      return byText && byCompany;
    });
  });

  paged = computed(() => {
    const start = (this.page() - 1) * this.pageSize;
    return this.filtered().slice(start, start + this.pageSize);
  });

  async loadUsers() {
    const data = await firstValueFrom(this.api.listUsers());
    this.users.set(data);
  }

  setQuery(value: string) {
    this.query.set(value);
    this.page.set(1);
  }

  setCompany(value: string) {
    this.company.set(value);
    this.page.set(1);
  }

  async openSidebar(user: User) {
    this.selectedUser.set(user);
    this.lastPosts.set(await firstValueFrom(this.api.lastPostsByUser(user.id)));
  }

  closeSidebar() {
    this.selectedUser.set(null);
    this.lastPosts.set(null);
  }
}
