import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;
  let authSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authSpy = jasmine.createSpyObj('AuthService', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, NoopAnimationsModule],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debe tener el botón deshabilitado cuando el formulario es inválido', () => {
    const button: HTMLButtonElement | null = fixture.nativeElement.querySelector('button[type="submit"]')
      || fixture.nativeElement.querySelector('button');
    expect(button?.disabled).toBeTrue();
  });

  it('debe llamar a login y navegar al enviar un formulario válido', () => {
    component.form.setValue({ email: 'test@test.com', password: '123456' });
    fixture.detectChanges();

    const form: HTMLFormElement = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    expect(authSpy.login).toHaveBeenCalledOnceWith('test@test.com');
    expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['/users']);
  });

  it('no debe llamar a login si el formulario es inválido', () => {
    component.form.setValue({ email: 'invalido', password: '123' });
    fixture.detectChanges();

    const form: HTMLFormElement = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    expect(authSpy.login).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
