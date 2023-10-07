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
import { Store, StoreModule } from '@ngrx/store';
import { sessionVariableReducer } from './store/auth/reducer';
import { uiReducer } from './store/ui/reducer';
import { SidebarSearchComponent } from './components/sidebar-search/sidebar-search.component';
import { AppConfigService } from '@services/app-config.service';
import { AppHeaderInterceptor } from '@services/app-header.service';
import { userReducer } from './store/user/reducer';
import { UserEffects } from './store/user/effects';
import { EffectsModule } from '@ngrx/effects';
import { SessionVariableEffects } from './store/auth/effects';
import { MenuItemEffects } from './store/menuitem/effects';
import { menuItemReducer } from './store/menuitem/reducer';
import { UserComponent } from '@modules/main/header/user/user.component';

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
        UserComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        StoreModule.forRoot({
            auth: sessionVariableReducer, 
            ui: uiReducer, 
            user: userReducer,
            activeMenuItem: menuItemReducer
        }),
        EffectsModule.forRoot([UserEffects, SessionVariableEffects, MenuItemEffects]),
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
