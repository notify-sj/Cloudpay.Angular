import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, catchError, map, of, retry, tap, throwError } from 'rxjs';
import { SessionVariable } from '@/utils/session-variable';
import { Result } from '@/utils/result';
import { ToastrService } from 'ngx-toastr';
import { Endpoint, EndpointDetail, Endpoints } from '@/utils/endpoint-constants';
import { QueryParamType, Queryparams } from '@/utils/queryparams';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  _useCache: boolean = false;
  constructor(private http: HttpClient, private toaster: ToastrService,
    private cacheService: CacheService) {
    this.errorHandler = this.errorHandler.bind(this);
  }

  private getEndpointDetail(type: Endpoint): EndpointDetail {
    return Endpoints.get(type) as EndpointDetail;
  }

  private getApiUrl(type: Endpoint, urlParams: string = "") {
    let _endpoint = this.getEndpointDetail(type);
    this._useCache = _endpoint.useCache;
    return this.getBaseUrl(_endpoint.type) + _endpoint.url + (urlParams !== "" ? `/${urlParams}` : "");
  }

  private getBaseUrl(type: string) {
    return environment[type];
  }

  private getUrlParams(queryParams: Queryparams[]): string {
    return queryParams
      .filter(param => param.type === QueryParamType.URL)
      .map(param => param.value)
      .join('/');
  }

  private getHttpParams(queryParams: Queryparams[]): HttpParams {
    let params = new HttpParams();
    queryParams
      .filter(param => param.type === QueryParamType.QUERY)
      .forEach(param => {
        params = params.set(param.key, param.value); // make sure to reassign
      });
    return params;
  }

  getSessionVariable(_endpoint: Endpoint, token: string): Observable<SessionVariable> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      }),
    };
    return this.get<SessionVariable>(_endpoint, [], httpOptions.headers);
  }

  get<T>(_endpoint: Endpoint,
    queryParams: Queryparams[] = [],
    headers: HttpHeaders = null
  ): Observable<T> {
    const url = this.getApiUrl(_endpoint, this.getUrlParams(queryParams));
    const params = this.getHttpParams(queryParams);
    const cacheKey = `${url}?${params.toString()}`;

    const options: { params: HttpParams; headers?: HttpHeaders } = { params };
    if (headers)
      options.headers = headers;

    // Check cache first if useCache is true
    if (this._useCache && this.cacheService.has(cacheKey)) {
      return of(this.cacheService.get(cacheKey));
    }

    return this.http
      .get<Result<T>>(url, options)
      .pipe(
        map((response: Result<T>) => response.data),
        tap(data => {
          // Cache the result if useCache is true
          if (this._useCache) {
            this.cacheService.set(cacheKey, data);
          }
        }),
        retry(1),
        catchError(err => this.errorHandler(err, _endpoint))
      );
  }

  put<T>(_endpoint: Endpoint,
    queryParams: Queryparams[] = [],
    data: any): Observable<T> {
    const url = this.getApiUrl(_endpoint, this.getUrlParams(queryParams));
    const params = this.getHttpParams(queryParams);

    const options: { params: HttpParams; headers?: HttpHeaders } = { params };

    return this.http
      .put<T>(url, data, options)
      .pipe(retry(1),
        catchError(err => this.errorHandler(err, _endpoint))
      );
  }

  errorHandler(res, type: Endpoint) {
    let errorMessage = '';
    if (res.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = res.error.message;
    } else {
      // Get server-side error
      let _endpoint = this.getEndpointDetail(type);
      this.toaster.error(res.error.message, _endpoint.title);
      errorMessage = `Error Code: ${res.status}\nMessage: ${res.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

  invalidateCache(_endpoint: Endpoint, queryParams: Queryparams[] = []): void {
    // Construct cache key for the address
    const url = this.getApiUrl(_endpoint, this.getUrlParams(queryParams));
    const params = this.getHttpParams(queryParams);
    const cacheKey = `${url}?${params.toString()}`;

    // Invalidate the cache using this key
    this.cacheService.invalidate(cacheKey);
  }
}