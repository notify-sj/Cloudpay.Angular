import { Component, HostBinding, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { openCloseAnimation, rotateAnimation } from './menu-item.animations';
import { MenuItem } from '@/utils/menu-item';
import { MenuitemService } from '../../services/menuitem.service';
import { AppState } from '@/store/state';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { MenuState } from '@/store/menuitem/state';
import { MenuType } from '@/utils/menu-type';
import { selectMenuState } from '@/store/menuitem/selectors';
import { TabService } from '@modules/main/header/tab.service';

@Component({
    selector: 'app-menu-item',
    templateUrl: './menu-item.component.html',
    styleUrls: ['./menu-item.component.scss'],
    animations: [openCloseAnimation, rotateAnimation]
})
export class MenuItemComponent implements OnInit, OnChanges {
    @Input() menuItem: MenuItem = null;
    public isExpandable: boolean = false;
    public isMenuExtended: boolean = false;
    private menuState: Observable<MenuState>;
    private subscription: Subscription | null = null;

    @HostBinding('class') get hostClasses() {
        return `nav-item${this.isMenuExtended ? ' menu-is-opening menu-open' : ''}`;
    }
    public isMainActive: boolean = false;
    public isOneOfChildrenActive: boolean = false;

    constructor(private router: Router,
        private menuItemService: MenuitemService,
        private store: Store<AppState>,
        private tabService: TabService) {
        this.menuState = this.store.pipe(select(selectMenuState));
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes && this.menuItem && this.menuItem.isDefault) {
            this.activateMenu();
        }
    }

    ngOnInit(): void {
        if (
            this.menuItem &&
            this.menuItem.children &&
            this.menuItem.children.length > 0
        ) {
            this.isExpandable = true;
        }
        this.calculateIsActive(this.router.url);
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {
                this.calculateIsActive(event.url);
            });
    }

    public handleMainMenuAction() {
        this.menuItemService.ExtractParentID(this.menuItem.id);
        this.subscription = this.menuState.pipe(
            filter((state) => state && state.type === MenuType.MENU),  // Only pass through if type is MenuType.MENU
        ).subscribe(state => {
            // Handle the menu state here
            if (state.activeIds) {
                let a = state.activeIds.filter(y => y == this.menuItem.id);
                if (a.length == 0) {
                    this.toggleMenu();
                    if (this.subscription) {
                        this.subscription.unsubscribe();
                    }
                }
            }
        });
        if (this.isExpandable) {
            this.toggleMenu();
            return;
        }
        this.activateMenu();
    }

    private activateMenu() {
        this.tabService.addTab(this.menuItem.id, this.menuItem.name, 
            this.menuItem.path, this.menuItem.isDefault);
        this.router.navigate(this.menuItem.path);
    }

    public toggleMenu() {
        this.isMenuExtended = !this.isMenuExtended;
    }

    public calculateIsActive(url: string) {
        this.isMainActive = false;
        this.isOneOfChildrenActive = false;
        if (this.isExpandable) {
            this.menuItem.children.forEach((item) => {
                if (item.path[0] === url) {
                    this.isOneOfChildrenActive = true;
                    this.isMenuExtended = true;
                }
            });
        } else if (this.menuItem.path[0] === url) {
            this.isMainActive = true;
        }
        if (!this.isMainActive && !this.isOneOfChildrenActive) {
            this.isMenuExtended = false;
        }
    }
}
