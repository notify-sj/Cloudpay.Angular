import {
    Component,
    ElementRef,
    Input,
    OnInit,
    Renderer2,
    ViewChild
} from '@angular/core';
import {MENU} from '@modules/main/menu-sidebar/menu-sidebar.component';

@Component({
    selector: 'app-sidebar-search',
    templateUrl: './sidebar-search.component.html',
    styleUrls: ['./sidebar-search.component.scss']
})
export class SidebarSearchComponent implements OnInit {
    public searchText: string = '';
    public foundMenuItems = [];
    @ViewChild('searchResult') searchResult: ElementRef;
    @Input() sidebarSearch: ElementRef;

    constructor(private renderer: Renderer2) {}

    ngOnInit(): void {}

    handleSearchTextChange(event) {
        this.foundMenuItems = [];

        if (event.target.value) {
            this.searchText = event.target.value;
            this.findMenuItems(MENU);
            return;
        } else {
            this.searchText = '';
            this.hideDiv();
        }
    }

    hideDiv() {
        this.renderer.setStyle(this.searchResult.nativeElement, 'display', 'none');
        this.renderer.removeClass(this.sidebarSearch, 'sidebar-search-open');
    }

    showDiv() {
        this.renderer.setStyle(this.searchResult.nativeElement, 'display', 'block');
        this.renderer.addClass(this.sidebarSearch, 'sidebar-search-open');
      }

    handleIconClick() {
        this.searchText = '';
        this.hideDiv();
    }

    handleMenuItemClick() {
        this.searchText = '';
        this.hideDiv();
    }

    findMenuItems(menu) {
        if (!this.searchText || this.searchText.length < 3) {
            this.hideDiv();
            return;
        }

        menu.forEach((menuItem) => {
            if (
                menuItem.path &&
                menuItem.name
                    .toLowerCase()
                    .includes(this.searchText.toLowerCase())
            ) {
                this.foundMenuItems.push(menuItem);
            }
            if (menuItem.children) {
                return this.findMenuItems(menuItem.children);
            }
        });

        if (this.foundMenuItems.length > 0) {
            this.showDiv();
        }
    }

    boldString(str, substr) {
        return str.replaceAll(
            this.capitalizeFirstLetter(substr),
            `<strong class="text-light">${this.capitalizeFirstLetter(
                substr
            )}</strong>`
        );
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}
