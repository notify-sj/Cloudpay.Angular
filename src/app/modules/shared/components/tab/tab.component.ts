import { Tab, TabType } from '@/utils/tab';
import { Component, HostBinding, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { TabService } from '@services/tab.service';
import { BehaviorSubject, filter } from 'rxjs';

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
  activeLink: string;

  constructor(private tabService: TabService, private router: Router, private route: ActivatedRoute) { }

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
      let d = this.tabService.getTab(--index, TabType.MAIN);
      this.router.navigate(d.route);
    }
  }

  activateTab() {
    this.router.navigate(this.tabData.route);
    this.tabService.activeTab(this.tabData);
  }
}
