import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DrawerComponent } from './drawer.component';

describe('DrawerComponent', () => {
  let fixture: ComponentFixture<DrawerComponent>;
  let component: DrawerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DrawerComponent);
    component = fixture.componentInstance;
    component.title = 'Detalle';
    component.opened = true;
    fixture.detectChanges();
  });

  it('debe renderizar el título', () => {
    const title = fixture.nativeElement.querySelector('h2');
    expect(title.textContent).toContain('Detalle');
  });

  it('debe emitir closed al cerrar el drawer', () => {
    spyOn(component.closed, 'emit');
    const drawerEl: HTMLElement = fixture.nativeElement.querySelector('mat-drawer');
    drawerEl.dispatchEvent(new Event('closedStart'));
    expect(component.closed.emit).toHaveBeenCalled();
  });
});
