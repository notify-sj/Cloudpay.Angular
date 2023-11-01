import { Tab, TabType } from '@/utils/tab';
import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, HostBinding, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { TabService } from '@services/tab.service';
import { map } from 'rxjs';

const BASE_CLASSES = 'navbar-nav';
@Component({
  selector: 'app-employee-navbar',
  templateUrl: './employee-navbar.component.html',
  styleUrls: ['./employee-navbar.component.scss']
})
export class EmployeeNavbarComponent implements AfterContentChecked, OnChanges {
  @HostBinding('class') classes: string = BASE_CLASSES;
  @ViewChild('navbar') navbar: any;
  @ViewChild('next') nextBtn: any;
  @ViewChild('prev') prevBtn: any;
  @Input() width: number;
  @Input() alignRight: number;
  @Input() tabType: TabType = TabType.MAIN;
  @Input() setActive: boolean = false;
  scrollStep = 50; // Adjust the scroll step as needed
  navbarElement: HTMLElement;
  isScrollable: boolean = false;
  tabs: Tab[] = [];
  showPrev: boolean = false;
  

  constructor(private tabService: TabService,
    private renderer: Renderer2,
    private cdref: ChangeDetectorRef
  ) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && this.width > 0) {
      this.navbarElement = this.navbar.nativeElement;
      this.renderer.setStyle(this.navbarElement, 'max-width', `${this.width}px`);
      this.renderer.setStyle(this.nextBtn.nativeElement, 'right', `${this.alignRight}px`);
    }
  }

  ngAfterContentChecked(): void {
    this.tabService.tabs$
      .pipe(map(tabs => tabs && tabs.filter(x => x.type === this.tabType)))
      .subscribe((tabs) => {
        this.updateTabs(tabs);
        this.checkScrolling();
        this.cdref.detectChanges();
      });
  }

  updateTabs(tabs: Tab[]): void {
    this.tabs = this.tabType === TabType.EMPLOYEE ? tabs.sort(this.compareFn) : tabs;
  }

  compareFn(a: Tab, b: Tab) {
    if (a.id < b.id) {
      return -1;
    } else if (a.id > b.id) {
      return 1;
    }
    // a must be equal to b
    return 0;
  }

  checkScrolling() {
    if (this.navbarElement)
      this.isScrollable = this.navbarElement.scrollWidth > this.navbarElement.clientWidth;
  }

  scroll(scrollAmount: number) {
    this.navbarElement.scrollLeft += scrollAmount;
    this.showPrev = this.navbarElement.scrollLeft > 0;
  }

  closeTab(tab: Tab) {
    this.tabService.removeTab(tab.id);
  }
}
