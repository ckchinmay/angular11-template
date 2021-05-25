import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpErrorResponse,
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { JwtTokenService } from '../services/jwt-token/jwt-token.service';


@Injectable({
  providedIn:'root'
})
export class TokenInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(public tokenService: JwtTokenService) { }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
    });

    this.requests.push(request);

    return Observable.create(observer => {
      const subscription = next.handle(request)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.removeRequest(request);
              observer.next(event);
            }
          },
          err => {
            this.removeRequest(request);
            observer.error(err);
          },
          () => {
            this.removeRequest(request);
            observer.complete();
          });

      // remove request from queue when cancelled
      return () => {
        this.removeRequest(request);
        subscription.unsubscribe();
      };
    });
  }
}
