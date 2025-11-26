import { HttpInterceptorFn } from '@angular/common/http';
import { signal } from '@angular/core';
import { finalize } from 'rxjs/operators';

export const isLoading = signal(0);
export const LoadingInterceptor: HttpInterceptorFn = (req, next) => {
  isLoading.update(v => v + 1);
  return next(req).pipe(finalize(() => isLoading.update(v => Math.max(0, v - 1))));
};
