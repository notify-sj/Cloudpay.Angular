import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { openCloseAnimation, rotateAnimation } from './menu-item.animations';
import { MenuItem } from '@/utils/menu-item';
import { MenuitemService } from './menuitem.service';
import { AppState } from '@/store/state';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-menu-item',
    templateUrl: './menu-item.component.html',
    styleUrls: ['./menu-item.component.scss'],
    animations: [openCloseAnimation, rotateAnimation]
})
export class MenuItemComponent implements OnInit {
    @Input() menuItem: MenuItem = null;
    public isExpandable: boolean = false;
    public isMenuExtended: boolean = false;
    private activeIds: Observable<number[]>;
    private subscription: Subscription | null = null;

    @HostBinding('class') get hostClasses() {
        return `nav-item${this.isMenuExtended ? ' menu-is-opening menu-open' : ''}`;
    }
    public isMainActive: boolean = false;
    public isOneOfChildrenActive: boolean = false;

    constructor(private router: Router,
        private menuItemService: MenuitemService,
        private store: Store<AppState>) { }

    ngOnInit(): void {
        this.activeIds = this.store.select('activeMenuItem');
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
        this.subscription = this.activeIds.subscribe((res: any) => {
            let activeId = res.activeIds as Array<number>;
            if (activeId) {
                let a = activeId.filter(y => y == this.menuItem.id);
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
