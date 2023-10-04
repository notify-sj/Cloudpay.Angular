import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AppConfigService } from './app-config.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { SessionVariable } from '@/utils/session-variable';
import { AppState } from '@/store/state';

@Injectable({
  providedIn: 'root'
})
export class AppHeaderInterceptor implements HttpInterceptor {
  private sessionVariable: Observable<SessionVariable>;
  private jsonToken: string = null;
  constructor(private store: Store<AppState>) {
    this.sessionVariable = this.store.select('auth');
    this.sessionVariable.subscribe((res: any) => {
      let config = res.session;
      this.jsonToken = config?.jsonToken;
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      setHeaders: {
        'contentType': 'application/json;charset=utf-8',
        'hfJSONToken': this.jsonToken ? this.jsonToken : ""
      },
    });

    return next.handle(modifiedReq);
  }
}
