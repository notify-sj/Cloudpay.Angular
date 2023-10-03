import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { SessionVariable } from '@/utils/session-variable';
import { Result } from '@/utils/result';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) {}
    
  private getApiUrl(type: string, endpoint: string) {
    return this.getBaseUrl(type) + endpoint;
  }

  private getBaseUrl(type: string) {
    return environment[type];
  }

  getSessionVariable(type: string, endpoint: string, token: string): Observable<SessionVariable> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      }),
    };
    return this.http
      .get<SessionVariable>(this.getApiUrl(type, endpoint), httpOptions)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  get<T>(type: string, endpoint: string): Observable<Result<T>> {
    return this.http
      .get<T>(this.getApiUrl(type, endpoint))
      .pipe(retry(1), catchError(this.errorHandler));
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
