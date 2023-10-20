import { SessionVariable } from '@/utils/session-variable';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Store } from '@ngrx/store';
import { loadSessionVariable } from '@/store/auth/actions';
import { Endpoint } from '@/utils/endpoint-constants';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private data: SessionVariable = {};
  constructor(private service: ApiService,
    private store: Store) { }

  async getConfig() {
    return this.data;
  }

  public initialize(defaults?: SessionVariable): Promise<SessionVariable> {
    return new Promise<SessionVariable>((resolve) => {
      const url = new URL(window.location.href);
      const token = url.searchParams.get('token');
      if (token)
        this.service.getSessionVariable(Endpoint.SessionVariable, token).subscribe((sessionVariable) => {
          this.data = Object.assign({}, defaults || {}, sessionVariable || {});
          this.store.dispatch(loadSessionVariable());
          resolve(this.data);
        });
    });
  }
}
