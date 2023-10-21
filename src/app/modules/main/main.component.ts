import { AppState } from '@/store/state';
import { ToggleSidebarMenu } from '@/store/ui/actions';
import { UiState } from '@/store/ui/state';
import { AfterViewInit, Component, ElementRef, HostBinding, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OverlayScrollbars } from 'overlayscrollbars';


@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {
    @HostBinding('class') class = 'wrapper';
    public ui: Observable<UiState>;
    @ViewChild('contentWrapper', { static: false }) private contentWrapper!: ElementRef;

    constructor(private renderer: Renderer2, private store: Store<AppState>,
        private elRef: ElementRef) { }

    ngOnInit() {
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

    ngAfterViewInit(): void {
        const headerElement = this.elRef.nativeElement.querySelector('app-header');
        const footerElement = this.elRef.nativeElement.querySelector('app-footer');

        const headerHeight = headerElement.offsetHeight;
        const footerHeight = footerElement.offsetHeight;

        this.setContentWrapperHeight(headerHeight, footerHeight);

        const contentWrapperElement = this.elRef.nativeElement.querySelector('.content-wrapper');
        OverlayScrollbars(contentWrapperElement, {});
    }

    setContentWrapperHeight(headerHeight: number, footerHeight: number): void {
        const contentWrapperElement = this.elRef.nativeElement.querySelector('.content-wrapper');
        const totalHeight = `calc(100vh - ${headerHeight}px - ${footerHeight}px)`;

        this.renderer.setStyle(contentWrapperElement, 'height', totalHeight);
        this.renderer.setStyle(contentWrapperElement, 'overflow-y', 'auto');
    }

    onToggleMenuSidebar() {
        this.store.dispatch(new ToggleSidebarMenu());
    }
}
