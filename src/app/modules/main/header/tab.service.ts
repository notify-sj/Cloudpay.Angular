import { Tab } from '@/utils/tab';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabService {
  tabs: Tab[] = [];

  addTab(id: number, label: string, route: string[], isDefault: boolean) {
    if (!this.tabs.find(x => x.id === id))
      this.tabs.push(new Tab(id, label, route, isDefault));
  }

  closeTab(index: number) {
    this.tabs.splice(index, 1);
  }
}
