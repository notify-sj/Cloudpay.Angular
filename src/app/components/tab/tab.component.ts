import { Tab } from '@/utils/tab';
import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TabService } from '@modules/main/header/tab.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent {
  @HostBinding('class')
  get hostClasses() {
    return this.classString;
  }
  private classString: string = 'nav-item';

  @Input() tabData: Tab;
  @Input() width: number = 0;

  constructor(private tabService: TabService, private router: Router) { }

  closeTab() {
    if (!this.tabData.isDefault) {
      let index = this.tabService.tabs.indexOf(this.tabData);
      this.tabService.closeTab(index);
      let d = this.tabService.tabs[--index];
      this.router.navigate(d.route);
    }
  }

  activateTab() {
    this.router.navigate(this.tabData.route);
  }
}
