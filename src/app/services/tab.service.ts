import { Tab, TabType } from '@/utils/tab';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabService {
  private tabs: Tab[] = [];
  tabsMainSubject = new BehaviorSubject<Tab[]>(null);
  tabs$: Observable<Tab[]> = this.tabsMainSubject.asObservable();

  addTab(tab: Tab) {
    if (tab && !this.tabs.find(x => x.id === tab.id)) {//
      this.tabs.push(tab);
      this.tabsMainSubject.next(this.tabs);
    }
  }

  getTab(index: number, type: TabType): Tab {
    return this.tabs.filter(x => x.type === type)[index];
  }

  removeTab(tabId: number): number {
    const index = this.tabs.findIndex((tab) => tab.id === tabId);
    if (index !== -1) {
      this.tabs.splice(index, 1);
      this.tabsMainSubject.next(this.tabs);
    }
    return index;
  }

  activeTab(tab: Tab) {
    this.tabs.filter(x => x.type === tab.type).forEach(x => x.active = false);
    const foundTab = this.tabs.find(t => t.id === tab.id);
    if (foundTab) {
      foundTab.active = true;
    }
    this.tabsMainSubject.next(this.tabs);
  }
}
