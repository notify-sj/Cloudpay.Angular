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
import { ToastrModule } from 'ngx-toastr';

import { CommonModule, registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { Store } from '@ngrx/store';
import { SidebarSearchComponent } from './components/sidebar-search/sidebar-search.component';
import { AppConfigService } from '@services/app-config.service';
import { AppHeaderInterceptor } from '@services/app-header.service';
import { UserComponent } from '@modules/main/header/user/user.component';
import { LocalStoreModule } from './store/local-store.module';
import { NotificationsComponent } from '@modules/main/header/notifications/notifications.component';
import { NotificationDashboardComponent } from './components/notification-dashboard/notification-dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationListComponent } from '@components/notification-list/notification-list.component';
import { DataTablesModule } from 'angular-datatables';
import { ChangePasswordComponent } from './modules/main/header/change-password/change-password.component';
import { UnitsComponent } from './modules/main/header/units/units.component';
import { RolesComponent } from './modules/main/header/roles/roles.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NavbarComponent } from './modules/main/header/navbar/navbar.component';
import { SelfModule } from '@modules/self/self.module';
import { SharedModule } from '@modules/shared/shared.module';

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
        MenuItemComponent,
        SidebarSearchComponent,
        UserComponent,
        NotificationsComponent,
        NotificationDashboardComponent,
        NotificationListComponent,
        ChangePasswordComponent,
        UnitsComponent,
        RolesComponent,
        BreadcrumbComponent,
        LoadingComponent,
        NavbarComponent
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
        SelfModule,
        SharedModule
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
