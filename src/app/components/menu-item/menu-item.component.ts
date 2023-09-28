import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { openCloseAnimation, rotateAnimation } from './menu-item.animations';
import { MenuItem } from '@/shared/menu-item';
import { ApiConfigService } from '@services/api-config.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  animations: [openCloseAnimation, rotateAnimation]
})
export class MenuItemComponent implements OnInit {
  @Input() menuItem: MenuItem = null;
  public isExpandable: boolean = false;
  @HostBinding('class.nav-item') isNavItem: boolean = true;
  @HostBinding('class.menu-open') isMenuExtended: boolean = false;
  public isMainActive: boolean = false;
  public isOneOfChildrenActive: boolean = false;

  @Output() selected = new EventEmitter<string>();

  constructor(private router: Router, private appconfig:ApiConfigService) { }

  ngOnInit(): void {
    if (
      this.menuItem &&
      this.menuItem.children &&
      this.menuItem.children.length > 0
    ) {
      this.isExpandable = true;
    }
    this.calculateIsActive(this.router.url);
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.calculateIsActive(event.url);
      });
  }

  public handleMainMenuAction() {
    if (this.isExpandable) {
      this.toggleMenu();
      return;
    }
    this.setIframeSrc(this.menuItem.routePath[0]);
    // let roleName = this.appconfig.getConfig().roleName;
    // this.menuItem.routePath?.forEach(item => `${roleName}${item}`);
    // debugger;
    // this.router.navigate(this.menuItem.routePath);
  }

  public toggleMenu() {
    this.isMenuExtended = !this.isMenuExtended;
  }

  public calculateIsActive(url: string) {
    this.isMainActive = false;
    this.isOneOfChildrenActive = false;
    if (this.isExpandable) {
      this.menuItem.children.forEach((item) => {
        if (item.path[0] === url) {
          this.isOneOfChildrenActive = true;
          this.isMenuExtended = true;
        }
      });
    } else if (this.menuItem.path[0] === url) {
      this.isMainActive = true;
    }
    if (!this.isMainActive && !this.isOneOfChildrenActive) {
      this.isMenuExtended = false;
    }
  }

  setIframeSrc(value: string) {
    this.selected.emit(value);
  }
}
