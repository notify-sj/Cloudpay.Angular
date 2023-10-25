import { AppState } from '@/store/state';
import { ToggleSidebarMenu } from '@/store/ui/actions';
import { UiState } from '@/store/ui/state';
import { AfterViewInit, Component, ElementRef, HostBinding, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';


@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    @HostBinding('class') class = 'wrapper';
    public ui: Observable<UiState>;
    @ViewChild('contentWrapper', { static: false }) private contentWrapper!: ElementRef;
    isLoading = true;

    constructor(private renderer: Renderer2, private store: Store<AppState>,
        private elRef: ElementRef) { }

    ngOnInit() {
        // Simulate an asynchronous operation, e.g., API requests or other setup.
        setTimeout(() => {
            // Set isLoading to false when your application is ready to load.
            this.isLoading = false;
        }, 2000); // Adjust the time as needed.

        this.ui = this.store.select('ui');
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'login-page'
        );
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'register-page'
        );
        this.renderer.addClass(
            document.querySelector('app-root'),
            'layout-fixed'
        );

        this.ui.subscribe(
            ({ menuSidebarCollapsed }) => {
                if (menuSidebarCollapsed) {
                    this.renderer.removeClass(
                        document.querySelector('body'),
                        'sidebar-open'
                    );
                    this.renderer.addClass(
                        document.querySelector('body'),
                        'sidebar-collapse'
                    );
                } else {
                    this.renderer.removeClass(
                        document.querySelector('body'),
                        'sidebar-collapse'
                    );
                    this.renderer.addClass(
                        document.querySelector('body'),
                        'sidebar-open'
                    );
                }
            }
        );
    }

    onToggleMenuSidebar() {
        this.store.dispatch(new ToggleSidebarMenu());
    }
}
