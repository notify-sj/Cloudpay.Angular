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
import { Store, StoreModule, select } from '@ngrx/store';
import { authReducer } from './store/auth/reducer';
import { uiReducer } from './store/ui/reducer';
import { SidebarSearchComponent } from './components/sidebar-search/sidebar-search.component';
import { AppConfigService } from '@services/app-config.service';
import { AppHeaderInterceptor } from '@services/app-header.service';
import { userReducer } from './store/user/reducer';
import { UserEffects } from './store/user/effects';
import { EffectsModule } from '@ngrx/effects';
import { loadUserProfile } from './store/user/actions';
import { filter } from 'rxjs';

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
        SidebarSearchComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        StoreModule.forRoot({ auth: authReducer, ui: uiReducer, user: userReducer }),
        EffectsModule.forRoot([UserEffects]),
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true
        })
    ],
    providers: [
        AppConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: initApp,
            deps: [AppConfigService],
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AppHeaderInterceptor,
            multi: true,
            deps: [AppConfigService]
        }],
    bootstrap: [AppComponent]
})
export class AppModule { }
