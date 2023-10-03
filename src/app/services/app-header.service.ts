import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppHeaderInterceptor implements HttpInterceptor {
  constructor(private configService: AppConfigService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const config = this.configService.getConfig();

      const modifiedReq = req.clone({
          setHeaders: {
              'contentType': 'application/json;charset=utf-8',
              'hfJSONToken': config.jsonToken ? config.jsonToken : ""
          },
      });
      
      return next.handle(modifiedReq);
  }
}
