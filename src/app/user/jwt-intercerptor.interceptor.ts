import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import { EmployeeService } from './employee.service';

@Injectable()
export class JwtIntercerptorInterceptor implements HttpInterceptor {
  constructor( private router: Router, private usuarioService: EmployeeService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token: string = "";//this.usuarioService.getToken();
    let req = request;
    if (token) {
      req = request.clone({
        setHeaders: {
          authorization: `Bearer ${token}`
        }
      });
    }


    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === 401) {
          this.router.navigateByUrl('/login');
        }

        return throwError(err);

      })
    );

  }
}