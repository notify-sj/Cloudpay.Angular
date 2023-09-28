// query-param-resolver.service.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class QueryParamResolver implements Resolve<any> {
  constructor() {}

  resolve(route: ActivatedRouteSnapshot) {
    return route.queryParams;
  }
}