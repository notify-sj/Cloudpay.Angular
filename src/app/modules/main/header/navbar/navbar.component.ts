import { ToggleSidebarMenu } from '@/store/ui/actions';
import { AfterViewInit, Component, HostBinding, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { TabType } from '@/utils/tab';

const BASE_CLASSES = 'navbar-nav';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']

})
export class NavbarComponent {
  @HostBinding('class') classes: string = BASE_CLASSES;
  @Input() width: number;
  tabType: TabType = TabType.MAIN;
  @Input() alignRight: number = 0;

  constructor(private store: Store) { }

  onToggleMenuSidebar() {
    this.store.dispatch(new ToggleSidebarMenu());
  }
}
