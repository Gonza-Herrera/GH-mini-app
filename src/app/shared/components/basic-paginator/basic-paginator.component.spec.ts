import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BasicPaginatorComponent } from './basic-paginator.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { By } from '@angular/platform-browser';

describe('BasicPaginatorComponent', () => {
  let fixture: ComponentFixture<BasicPaginatorComponent>;
  let component: BasicPaginatorComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicPaginatorComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BasicPaginatorComponent);
    component = fixture.componentInstance;
    component.length = 20;
    component.pageSize = 5;
    fixture.detectChanges();
  });

  it('debe crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debe emitir pageChange al cambiar página', () => {
    spyOn(component.pageChange, 'emit');
    const event: PageEvent = { length: 20, pageIndex: 1, pageSize: 5, previousPageIndex: 0 };
    component.handlePage(event);
    expect(component.pageChange.emit).toHaveBeenCalledWith(event);
  });

  it('debe respetar estado disabled', () => {
    component.disabled = true;
    fixture.detectChanges();
    const paginatorDebug = fixture.debugElement.query(By.directive(MatPaginator));
    expect(paginatorDebug.componentInstance.disabled).toBeTrue();
  });
});
