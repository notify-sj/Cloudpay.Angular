import { ToggleSidebarMenu } from '@/store/ui/actions';
import { AfterContentChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { TabService } from '../tab.service';
import { Tab } from '@/utils/tab';

const BASE_CLASSES = 'navbar-nav';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']

})
export class NavbarComponent implements AfterViewInit, AfterContentChecked, OnInit {
  @HostBinding('class') classes: string = BASE_CLASSES;
  @ViewChild('navbar') navbar: any;
  @ViewChild('next') nextBtn: any;
  @ViewChild('prev') prevBtn: any;
  @Input() width: number;
  scrollStep = 50; // Adjust the scroll step as needed
  navbarElement: HTMLElement;
  isScrollable: boolean = false;
  tabs: Tab[] = [];

  constructor(private store: Store,
    private tabService: TabService,
    private renderer: Renderer2,
    private cdref: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.navbarElement = this.navbar.nativeElement;
    this.renderer.setStyle(this.navbarElement, 'max-width', `${this.width - 200}px`);
    this.renderer.setStyle(this.nextBtn.nativeElement, 'right', `${window.innerWidth - this.width + 8}px`);
  }
  
  ngAfterContentChecked(): void {
    this.tabService.tabs$.subscribe((tabs) => {
      this.tabs = tabs;
      this.checkScrolling();
      this.cdref.detectChanges();
    });
  }

  checkScrolling() {
    if (this.navbarElement)
      this.isScrollable = this.navbarElement.scrollWidth > this.navbarElement.clientWidth;
  }

  scroll(scrollAmount: number) {
    this.navbarElement.scrollLeft += scrollAmount;
  }

  closeTab(tab: Tab) {
    this.tabService.removeTab(tab.id);
  }

  onToggleMenuSidebar() {
    this.store.dispatch(new ToggleSidebarMenu());
  }
}
