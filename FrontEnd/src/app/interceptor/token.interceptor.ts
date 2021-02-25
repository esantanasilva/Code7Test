import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { LoginService } from '../services/login.service';
import { Observable, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {

//   constructor(private loginService: LoginService, private router: Router) {}

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

//     request = request.clone({
//       setHeaders: {
//         Authorization: `Bearer ${this.loginService.getToken()}`
//       }
//     });
//     debugger;
//     return next.handle(request).pipe( tap(() => {},
//       (err: any) => {
//       if (err instanceof HttpErrorResponse) {
//         if (err.status !== 401) {
//           console.log(request);
//          return;
//         }
//         localStorage.removeItem('access_token');
//         // this.router.navigate(['login']);
//       }
//     }));
//   }
// }
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService, private router: Router) { }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token: string = this.loginService.getToken()

    if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', `Bearer ${this.loginService.getToken()}`) });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

    return next.handle(request).pipe( tap(() => {},
      (err: any) => {
      debugger;
      if (err instanceof HttpErrorResponse) {
        if (err.status == 401) {
         this.loginService.logout();
        }

        return;
      }
    }));
  }
}