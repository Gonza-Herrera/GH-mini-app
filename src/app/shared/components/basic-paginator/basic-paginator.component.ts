import { Component, EventEmitter, Input, Output, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-basic-paginator',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './basic-paginator.component.html',
  providers: [{ provide: MatPaginatorIntl, useFactory: spanishPaginatorIntl }],
})
export class BasicPaginatorComponent {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  @Input() length = 0;
  @Input() pageIndex = 0;
  @Input() pageSize = 5;
  @Input() pageSizeOptions: number[] = [5];
  @Input() hidePageSize = true;
  @Input() disabled = false;

  @Output() pageChange = new EventEmitter<PageEvent>();

  handlePage(event: PageEvent) {
    this.pageChange.emit(event);
    queueMicrotask(() => {
      const active = this.document.activeElement as HTMLElement | null;
      if (active?.tagName === 'BUTTON') {
        active.blur();
      }
    });
  }
}

function spanishPaginatorIntl(): MatPaginatorIntl {
  const intl = new MatPaginatorIntl();
  intl.nextPageLabel = 'Siguiente página';
  intl.previousPageLabel = 'Página anterior';
  intl.firstPageLabel = 'Primera página';
  intl.lastPageLabel = 'Última página';
  intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }

    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  };
  return intl;
}
