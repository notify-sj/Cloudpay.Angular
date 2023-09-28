import { EmployeeProfile } from '@/shared/employee-profile';
import { MenuItem } from '@/shared/menu-item';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiConfigService } from '@services/api-config.service';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
  COMPANY_NAME: string = "";
  UserName: string = "";
  UserImage: string = "";
  menu: Array<MenuItem> = [];
  @Output() selected = new EventEmitter<string>();
  /**
   *
   */
  constructor(private appConfig: ApiConfigService, private apiService: ApiService) {
  }

  ngOnInit() {
    this.COMPANY_NAME = this.setDomainName(this.appConfig.getConfig().domainName);
    this.GetEmployeeProfile();
    this.GetMenus();
  }

  GetEmployeeProfile() {
    this.apiService.get<EmployeeProfile>("hrms", "Employee/Profile").subscribe((res) => {
      let profile = res.data;
      this.UserName = profile.emp_name;
      this.UserImage = "data:image/png;base64," + profile.emp_image;
    });
  }

  GetMenus() {
    this.apiService.get<Array<MenuItem>>("admin", "admin/menu/Angular").subscribe((res) => {
      let menus = res.data;
      this.menu = menus;
      menus.forEach(item => {
        MENU.push(item);
      });
    });
  }

  setDomainName(domainName: string): string {
    let _companyName = '';
    switch (domainName) {
      case 'AMPLE':
        _companyName = 'Ample Payroll';
        break;
      case 'PAYMAX':
      case 'RAPPORT':
      case 'TRESPAY':
        _companyName = domainName;
        break;
      default:
        _companyName = 'CloudPay';
        break;
    }
    return _companyName;
  }

  onMenuItemSelected(selectedItem: string) {
    this.selected.emit(selectedItem);
  }
}

export const MENU = [];
