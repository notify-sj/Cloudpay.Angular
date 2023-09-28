import { Injectable, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';
import { SessionVariable } from '@/shared/session-variable';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  private data: SessionVariable = {};
  constructor(private service: ApiService) { }

  getConfig(): SessionVariable{
    return this.data;
  }

  public initialize(defaults?: SessionVariable): Promise<SessionVariable> {
    return new Promise<SessionVariable>((resolve) => {
      const url = new URL(window.location.href);
      const token = url.searchParams.get('token');
      if (token)
        this.service.getSessionVariable("admin", "admin/session", token).subscribe((sessionVariable) => {
          this.data = Object.assign({}, defaults || {}, sessionVariable || {});
          resolve(this.data);
        });
    });
  }
}
