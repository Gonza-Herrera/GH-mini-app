import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal, computed } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserListComponent } from './user-list.component';
import { User, Post } from '../models/user.model';
import { UsersStore } from '../store/user.store';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

class MockUsersStore {
  private _users = signal<User[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  query = signal('');
  company = signal('all');
  page = signal(1);
  readonly pageSize = 5;
  selectedUser = signal<User | null>(null);
  lastPosts = signal<Post[]>([]);
  lastPostsLoading = signal(false);
  lastPostsError = signal<string | null>(null);

  filtered = computed(() => this._users());
  paged = computed(() => this._users());

  companies() {
    return ['all'];
  }

  setUsers(users: User[]) {
    this._users.set(users);
  }

  setQuery(_: string) {}
  setCompany(_: string) {}
  loadUsers() {}
  openSidebar(user: User) {
    this.selectedUser.set(user);
  }
  closeSidebar() {
    this.selectedUser.set(null);
  }
}

describe('UserListComponent', () => {
  let fixture: ComponentFixture<UserListComponent>;
  let component: UserListComponent;
  let store: MockUsersStore;
  let routerSpy: jasmine.SpyObj<Router>;
  let authSpy: jasmine.SpyObj<AuthService>;

  const users: User[] = [
    {
      id: 1,
      name: 'Alice',
      username: 'alice',
      email: 'alice@mail.com',
      phone: '1',
      website: 'a.com',
      company: { name: 'ACME' },
      address: { city: 'C', zipcode: '0' },
    },
  ];

  beforeEach(async () => {
    store = new MockUsersStore();
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    authSpy = jasmine.createSpyObj('AuthService', ['logout']);

    await TestBed.configureTestingModule({
      imports: [UserListComponent, NoopAnimationsModule],
      providers: [
        { provide: UsersStore, useValue: store },
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
  });

  it('debe mostrar estado de carga', () => {
    store.loading.set(true);
    fixture.detectChanges();
    const state = fixture.nativeElement.querySelector('.state');
    expect(state?.textContent?.toLowerCase()).toContain('cargando');
  });

  it('debe mostrar error y deshabilitar filtros', () => {
    store.error.set('error');
    fixture.detectChanges();
    const errorEl = fixture.nativeElement.querySelector('.state-error');
    expect(errorEl).toBeTruthy();
    const inputs = fixture.nativeElement.querySelectorAll('input, mat-select');
    expect([...inputs].some((el: any) => el.disabled)).toBeTrue();
  });

  it('debe renderizar usuarios cuando hay datos', () => {
    store.setUsers(users);
    fixture.detectChanges();
    const cards = fixture.nativeElement.querySelectorAll('app-info-card');
    expect(cards.length).toBe(1);
  });

  it('debe abrir drawer al seleccionar un usuario', () => {
    store.setUsers(users);
    fixture.detectChanges();
    const card: HTMLElement | null = fixture.nativeElement.querySelector('app-info-card');
    card?.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(store.selectedUser()).toEqual(users[0]);
  });

  it('debe cerrar sesión y navegar a login', () => {
    component.logout();
    expect(authSpy.logout).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
