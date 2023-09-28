import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiConfigService } from "./api-config.service";

@Injectable({
    providedIn: 'root'
})
export class HeaderInterceptor implements HttpInterceptor {
    constructor(private configService: ApiConfigService) {
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