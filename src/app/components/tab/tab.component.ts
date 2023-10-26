import { Tab } from '@/utils/tab';
import { Component, HostBinding, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TabService } from '@modules/main/header/tab.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit, OnDestroy, OnChanges {
  @HostBinding('class')
  get hostClasses() {
    return this.classString;
  }
  private classString: string = 'nav-item';

  @Input() tabData: Tab;

  constructor(private tabService: TabService, private router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && this.tabData)
      this.tabService.addTab(this.tabData);
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.tabService.removeTab(this.tabData.id);
  }

  closeTab() {
    if (!this.tabData.isDefault) {
      let index = this.tabService.removeTab(this.tabData.id);
      let d = this.tabService.getTab(--index);
      this.router.navigate(d.route);
    }
  }

  activateTab() {
    this.router.navigate(this.tabData.route);
  }
}
