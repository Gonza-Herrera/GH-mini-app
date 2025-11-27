import { AuthService } from './auth.service';

describe('AuthService', () => {
  const KEY = 'user_email';
  let service: AuthService;

  beforeEach(() => {
    sessionStorage.clear();
    service = new AuthService();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('debe iniciar deslogueado por defecto', () => {
    expect(service.isLogged()).toBeFalse();
  });

  it('debe guardar email y marcar login', () => {
    service.login('test@mail.com');
    expect(sessionStorage.getItem(KEY)).toBe('test@mail.com');
    expect(service.email()).toBe('test@mail.com');
    expect(service.isLogged()).toBeTrue();
  });

  it('debe limpiar sesión al hacer logout', () => {
    service.login('test@mail.com');
    service.logout();
    expect(sessionStorage.getItem(KEY)).toBeNull();
    expect(service.isLogged()).toBeFalse();
    expect(service.email()).toBeNull();
  });
});
