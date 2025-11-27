import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { authGuard, authReverseGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('Guards de auth', () => {
  let routerStub: jasmine.SpyObj<Router>;
  let authStub: jasmine.SpyObj<AuthService>;
  const route: any = {};
  const state: any = { url: '/users' };

  beforeEach(() => {
    routerStub = jasmine.createSpyObj('Router', ['createUrlTree']);
    routerStub.createUrlTree.and.callFake((commands: any[]) => new FakeUrlTree(commands.join('')));
    authStub = jasmine.createSpyObj('AuthService', ['isLogged']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: AuthService, useValue: authStub },
      ],
    });
  });

  it('authGuard permite acceso cuando está logueado', () => {
    authStub.isLogged.and.returnValue(true);
    const result = TestBed.runInInjectionContext(() => authGuard(route, state));
    expect(result).toBeTrue();
  });

  it('authGuard redirige a login cuando no está logueado', () => {
    authStub.isLogged.and.returnValue(false);
    const result = TestBed.runInInjectionContext(() => authGuard(route, state));
    expect(result instanceof FakeUrlTree).toBeTrue();
    expect((result as FakeUrlTree).value).toContain('/login');
  });

  it('authReverseGuard permite acceso a login si NO está logueado', () => {
    authStub.isLogged.and.returnValue(false);
    const result = TestBed.runInInjectionContext(() => authReverseGuard(route, state));
    expect(result).toBeTrue();
  });

  it('authReverseGuard redirige a /users cuando ya está logueado', () => {
    authStub.isLogged.and.returnValue(true);
    const result = TestBed.runInInjectionContext(() => authReverseGuard(route, state));
    expect(result instanceof FakeUrlTree).toBeTrue();
    expect((result as FakeUrlTree).value).toContain('/users');
  });
});

class FakeUrlTree implements UrlTree {
  root: any;
  queryParams: any;
  fragment: string | null = null;
  constructor(public value: string) {}
  get queryParamMap(): any {
    return {} as any;
  }
  toString() {
    return this.value;
  }
}
