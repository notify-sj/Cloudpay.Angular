import { SessionVariable } from '@/shared/session-variable';
import { Component } from '@angular/core';
import { ApiConfigService } from '@services/api-config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  unitName: string = "";
  roleName: string = "";
  constructor(appConfig: ApiConfigService) {
    this.unitName = appConfig.getConfig().unitName;
    this.roleName = appConfig.getConfig().roleName.toUpperCase();
  }
}
