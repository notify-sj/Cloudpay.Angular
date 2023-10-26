import { Tab } from '@/utils/tab';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabService {
  private tabs: Tab[] = [];
  tabsSubject = new BehaviorSubject<Tab[]>(null);
  tabsRemoveSubject = new BehaviorSubject<number>(0);
  tabs$: Observable<Tab[]> = this.tabsSubject.asObservable();

  addTab(tab: Tab) {
    if (!this.tabs.find(x => x.id === tab.id)) {
      this.tabs.push(tab);
      this.tabsSubject.next(this.tabs);
    }
  }

  getTab(index: number): Tab {
    return this.tabs[index];
  }

  removeTab(tabId: number): number {
    const index = this.tabs.findIndex((tab) => tab.id === tabId);
    if (index !== -1) {
      this.tabs.splice(index, 1);
      this.tabsRemoveSubject.next(tabId);
    }
    return index;
  }
}
