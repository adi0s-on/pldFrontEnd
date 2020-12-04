import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public _authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this._authService._credentials?.accessToken) {
      req = this.addToken(req, this._authService._credentials.accessToken);
    }

    return next.handle(req).pipe(
      catchError((error) => {
        return throwError(error)
      })
    )
  }

  private addToken(req: HttpRequest<any>, token: string): any {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}
