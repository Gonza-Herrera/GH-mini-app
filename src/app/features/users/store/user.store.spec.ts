import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { UsersStore } from './user.store';
import { UsersService } from '../services/user.service';
import { User, Post } from '../models/user.model';

describe('UsersStore', () => {
  const users: User[] = [
    {
      id: 1,
      name: 'Alice',
      username: 'alice',
      email: 'alice@mail.com',
      phone: '123',
      website: 'a.com',
      company: { name: 'ACME' },
      address: { city: 'City', zipcode: '000' },
    },
    {
      id: 2,
      name: 'Bob',
      username: 'bob',
      email: 'bob@mail.com',
      phone: '456',
      website: 'b.com',
      company: { name: 'Other' },
      address: { city: 'Town', zipcode: '111' },
    },
  ];

  const posts: Post[] = [{ userId: 1, id: 1, title: 'Hello', body: 'World' }];

  let store: UsersStore;
  let serviceMock: jasmine.SpyObj<UsersService>;

  beforeEach(() => {
    serviceMock = jasmine.createSpyObj('UsersService', ['listUsers', 'lastPostsByUser']);

    TestBed.configureTestingModule({
      providers: [UsersStore, { provide: UsersService, useValue: serviceMock }],
    });

    store = TestBed.inject(UsersStore);
  });

  it('debe cargar usuarios exitosamente', async () => {
    serviceMock.listUsers.and.returnValue(of(users));

    await store.loadUsers();

    expect(store.users()).toEqual(users);
    expect(store.error()).toBeNull();
  });

  it('debe setear error si falla la carga de usuarios', async () => {
    serviceMock.listUsers.and.returnValue(throwError(() => new Error('fail')));

    await store.loadUsers();

    expect(store.error()).toBeTruthy();
    expect(store.users().length).toBe(0);
  });

  it('debe filtrar por nombre/email y compañía y resetear página', async () => {
    serviceMock.listUsers.and.returnValue(of(users));
    await store.loadUsers();

    store.setQuery('alice');
    expect(store.filtered().length).toBe(1);
    expect(store.page()).toBe(1);

    store.setQuery('');
    store.setCompany('Other');
    expect(store.filtered()[0].name).toBe('Bob');
    expect(store.page()).toBe(1);
  });

  it('debe cargar posts y manejar error', async () => {
    serviceMock.listUsers.and.returnValue(of(users));
    serviceMock.lastPostsByUser.and.returnValue(of(posts));
    await store.loadUsers();

    await store.openSidebar(users[0]);
    expect(store.lastPosts()).toEqual(posts);
    expect(store.lastPostsError()).toBeNull();

    serviceMock.lastPostsByUser.and.returnValue(throwError(() => new Error('fail posts')));
    await store.openSidebar(users[0]);
    expect(store.lastPostsError()).toBeTruthy();
  });
});
