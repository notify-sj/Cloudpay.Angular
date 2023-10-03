import { SessionVariable } from '@/utils/session-variable';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private data: SessionVariable = {};
  constructor(private service: ApiService) { }

  getConfig(): SessionVariable {
    return this.data;
  }

  public initialize(defaults?: SessionVariable): Promise<SessionVariable> {
    return new Promise<SessionVariable>((resolve) => {
      const url = new URL(window.location.href);
      const token = url.searchParams.get('token');
      if (token)
        this.service.getSessionVariable("admin", "admin/session", token).subscribe((sessionVariable) => {
          this.data = Object.assign({}, defaults || {}, sessionVariable || {});
          console.log("APP_INITI");
          resolve(this.data);
        });
    });
  }
}
