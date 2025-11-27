import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoCardComponent } from './info-card.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('InfoCardComponent', () => {
  let fixture: ComponentFixture<InfoCardComponent>;
  let component: InfoCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoCardComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoCardComponent);
    component = fixture.componentInstance;
    component.title = 'Título';
    component.items = [{ icon: 'person', text: 'item' }];
    fixture.detectChanges();
  });

  it('debe renderizar título e ítems', () => {
    const title = fixture.nativeElement.querySelector('mat-card-title');
    const items = fixture.nativeElement.querySelectorAll('.info-row');
    expect(title.textContent).toContain('Título');
    expect(items.length).toBe(1);
  });

  it('debe emitir selected al hacer click', () => {
    spyOn(component.selected, 'emit');
    fixture.nativeElement.dispatchEvent(new Event('click'));
    expect(component.selected.emit).toHaveBeenCalled();
  });

  it('no debe emitir si clickable es false', () => {
    component.clickable = false;
    fixture.detectChanges();
    spyOn(component.selected, 'emit');
    fixture.nativeElement.dispatchEvent(new Event('click'));
    expect(component.selected.emit).not.toHaveBeenCalled();
  });
});
