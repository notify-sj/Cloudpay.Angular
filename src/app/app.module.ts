import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from '@/app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from '@modules/main/main.component';
import { HeaderComponent } from '@modules/main/header/header.component';
import { FooterComponent } from '@modules/main/footer/footer.component';
import { MenuSidebarComponent } from '@modules/main/menu-sidebar/menu-sidebar.component';
import { BlankComponent } from '@pages/blank/blank.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { ToastrModule } from 'ngx-toastr';

import { CommonModule, registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import { MainMenuComponent } from './pages/main-menu/main-menu.component';
import { SubMenuComponent } from './pages/main-menu/sub-menu/sub-menu.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { Store } from '@ngrx/store';
import { SidebarSearchComponent } from './components/sidebar-search/sidebar-search.component';
import { AppConfigService } from '@services/app-config.service';
import { AppHeaderInterceptor } from '@services/app-header.service';
import { UserComponent } from '@modules/main/header/user/user.component';
import { LocalStoreModule } from './store/local-store.module';
import { NotificationsComponent } from '@modules/main/header/notifications/notifications.component';
import { ModalComponent } from './components/modal/modal.component';
import { NotificationDashboardComponent } from './components/notification-dashboard/notification-dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationListComponent } from '@components/notification-list/notification-list.component';
import { DataTablesModule } from 'angular-datatables';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';

registerLocaleData(localeEn, 'en-EN');

function initApp(configService: AppConfigService) {
    return () => configService.initialize();
}

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        HeaderComponent,
        FooterComponent,
        MenuSidebarComponent,
        BlankComponent,
        DashboardComponent,
        MainMenuComponent,
        SubMenuComponent,
        MenuItemComponent,
        SidebarSearchComponent,
        UserComponent,
        NotificationsComponent,
        ModalComponent,
        NotificationDashboardComponent,
        NotificationListComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        LocalStoreModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true
        }),
        NgbModule, 
        DataTablesModule,
        OverlayscrollbarsModule
    ],
    providers: [
        AppConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: initApp,
            deps: [AppConfigService, Store],
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AppHeaderInterceptor,
            multi: true,
            deps: [Store]
        }],
    bootstrap: [AppComponent]
})
export class AppModule { }
