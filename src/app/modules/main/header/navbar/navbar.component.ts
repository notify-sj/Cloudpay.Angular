import { ToggleSidebarMenu } from '@/store/ui/actions';
import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostBinding, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { TabService } from '../tab.service';
import { Tab } from '@/utils/tab';

const BASE_CLASSES = 'navbar-nav overflow-hidden';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewChecked, AfterViewInit, OnInit {
  @HostBinding('class') classes: string = BASE_CLASSES;
  @ViewChild('next') nextBtn: any;
  @ViewChild('prev') prevBtn: any;
  @Input() width: number;
  scrollStep = 50; // Adjust the scroll step as needed
  navbarElement: HTMLElement;
  isScrollable: boolean = false;

  constructor(private store: Store,
    private elemRef: ElementRef,
    public tabService: TabService,
    private renderer: Renderer2,
    private cdRef: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {
  }
  ngOnInit(): void {
    this.navbarElement = this.elemRef.nativeElement;

  }
  ngAfterViewInit(): void {
  }

  ngAfterViewChecked() {
    this.renderer.setStyle(this.navbarElement, 'max-width', `${this.width - 100}px`);
    this.renderer.setStyle(this.nextBtn.nativeElement, 'right', `${window.innerWidth - this.width + 8}px`);
    // this.renderer.setStyle(this.prevBtn.nativeElement, 'left', `10px`);
    this.checkScrolling();
    this.cdRef.detectChanges(); // Manually trigger change detection
  }

  checkScrolling() {
    this.isScrollable = this.navbarElement.scrollWidth > this.navbarElement.clientWidth;
  }

  scroll(scrollAmount: number) {
    this.navbarElement.scrollLeft += scrollAmount;
  }

  closeTab(tab: Tab) {
    this.tabService.closeTab(this.tabService.tabs.indexOf(tab));
  }

  onToggleMenuSidebar() {
    this.store.dispatch(new ToggleSidebarMenu());
  }
}
