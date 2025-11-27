import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const snack = inject(MatSnackBar);
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      let msg = 'Error desconocido';
      switch (err.status) {
        case 0:   msg = 'Sin conexión con el servidor.'; break;
        case 400: msg = 'Solicitud inválida (400).'; break;
        case 401: msg = 'No autorizado (401).'; break;
        case 403: msg = 'Prohibido (403).'; break;
        case 404: msg = 'Recurso no encontrado (404).'; break;
        default:
          if (err.status >= 500) msg = 'Error del servidor (5xx).';
          else msg = `Error (${err.status}).`;
      }
      snack.open(msg, 'Cerrar', { duration: 4000, verticalPosition: 'top' });
      return throwError(() => err);
    })
  );
};
