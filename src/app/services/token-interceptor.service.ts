import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {API_KEY} from '../config/api.config';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler):
    Observable<HttpEvent<any>> {

    const bypassAPIKey = 'cpost'
    const clone = request.clone({
        headers: request.url.includes(bypassAPIKey) ? request.headers : this.addExtraHeaders(request.headers),
      }
    );

    return next.handle(clone).pipe(
      catchError(this.handleError),
    );
  }

  handleError(error: HttpErrorResponse) {
    console.log('interceptor error', JSON.stringify(error));
    return throwError(error);
  }

  private addExtraHeaders(headers: HttpHeaders): HttpHeaders {
    headers = headers.append('APIKey', API_KEY);

    return headers;
  }

}
