import { loadMenuItemState } from '@/store/menuitem/actions';
import { MenuState } from '@/store/menuitem/state';
import { MENU, MenuItem } from '@/utils/menu-item';
import { MenuType } from '@/utils/menu-type';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class MenuitemService {
  private menu: MenuState;
  private isFirstCall: boolean = true;
  constructor(private store: Store) {
  }

  getMenuState() {
    return this.menu;
  }

  ExtractParentID(id: number) {
    this.isFirstCall = !this.menu;
    this.menu = new MenuState();
    this.menu.activeIds = [];
    this.menu.type = MenuType.MENU;
    this.setActiveIds(MENU, id);
    this.menu.activeIds = this.menu.activeIds.filter(item => item !== 0);
    if (!this.isFirstCall)
      this.store.dispatch(loadMenuItemState());
  }

  private setActiveIds(menus: MenuItem[], id: number) {
    for (let menu of menus) {
      if (menu.id === id) {
        this.menu.activeIds.push(id);
        return true;
      }

      if (menu.children) {
        let found = this.setActiveIds(menu.children, id);
        if (found) {
          this.menu.activeIds.push(menu.id);
          return true;
        }
      }
    }
    return false;
  }
}

