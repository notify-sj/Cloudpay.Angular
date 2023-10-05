import { loadMenuItemActiveIds } from '@/store/menuitem/actions';
import { MenuItem } from '@/utils/menu-item';
import { Injectable } from '@angular/core';
import { MENU } from '@modules/main/menu-sidebar/menu-sidebar.component';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class MenuitemService {
  private activeIds: Array<number>;
  private isFirstCall: boolean = true;
  constructor(private store: Store) {
  }

  getActiveIds() {
    return this.activeIds;
  }

  ExtractParentID(id: number) {
    this.isFirstCall = !this.activeIds;
    this.activeIds = new Array<number>();
    this.setActiveIds(MENU, id);
    this.activeIds = this.activeIds.filter(item => item !== 0);
    if (!this.isFirstCall)
      this.store.dispatch(loadMenuItemActiveIds());
  }

  private setActiveIds(menus: MenuItem[], id: number) {
    for (let menu of menus) {
      if (menu.id === id) {
        this.activeIds.push(id);
        return true;
      }

      if (menu.children) {
        let found = this.setActiveIds(menu.children, id);
        if (found) {
          this.activeIds.push(menu.id);
          return true;
        }
      }
    }
    return false;
  }
}

