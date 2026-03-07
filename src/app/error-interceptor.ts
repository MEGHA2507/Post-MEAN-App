import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Error } from './error/error';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const dialog = inject(MatDialog);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      console.log(error);

      let errorMessage = 'An unknown error occurred';

      if (error.error.message) {
        errorMessage = error.error.message;
      } 

      dialog.open(Error, {
        data: {
          message: errorMessage
        }
      });

      return throwError(() => error);
    })
  );

};