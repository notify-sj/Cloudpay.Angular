import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { SessionVariable } from '@/utils/session-variable';
import { Result } from '@/utils/result';
import { ToastrService } from 'ngx-toastr';
import { Endpoint, EndpointDetail, Endpoints } from '@/utils/endpoint-constants';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient, private toaster: ToastrService) {
    this.errorHandler = this.errorHandler.bind(this);
  }

  private getEndpointDetail(type: Endpoint): EndpointDetail {
    return Endpoints.get(type) as EndpointDetail;
  }

  private getApiUrl(type: Endpoint) {
    let _endpoint = this.getEndpointDetail(type);
    return this.getBaseUrl(_endpoint.type) + _endpoint.url;
  }

  private getBaseUrl(type: string) {
    return environment[type];
  }

  getSessionVariable(_endpoint: Endpoint, token: string): Observable<SessionVariable> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      }),
    };
    return this.http
      .get<SessionVariable>(this.getApiUrl(_endpoint), httpOptions)
      .pipe(retry(1), catchError(err => this.errorHandler(err, _endpoint)));
  }

  get<T>(_endpoint: Endpoint): Observable<T> {
    return this.http
      .get<Result<T>>(this.getApiUrl(_endpoint))
      .pipe(
        map((response: Result<T>) => response.data),
        retry(1),
        catchError(err => this.errorHandler(err, _endpoint))
      );
  }

  put<T>(_endpoint: Endpoint, data: any): Observable<T> {
    return this.http
      .put<T>(this.getApiUrl(_endpoint), data)
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
}
