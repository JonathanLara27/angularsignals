import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from './loading-http.service';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {

  private _loadingService = inject(LoadingService);

  constructor() {}


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this._loadingService.setLoading(true);
    return next.handle(request).pipe(
      finalize(() => {
        this._loadingService.setLoading(false);
      })
    );
  }
}
