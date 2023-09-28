import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './modules/main/main.component';
import { HeaderComponent } from './modules/header/header.component';
import { MenuSidebarComponent } from './modules/menu-sidebar/menu-sidebar.component';
import { ApiConfigService } from '@services/api-config.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeaderInterceptor } from '@services/api-header-service.interceptor';
import { SidebarSearchComponent } from './components/sidebar-search/sidebar-search.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SafePipe } from './pipes/safe-pipe';
import { DashboardComponent } from './components/dashboard/dashboard.component';


function initApp(configService: ApiConfigService) {
  return () => configService.initialize();
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    MenuSidebarComponent,
    SidebarSearchComponent,
    MenuItemComponent, 
    SafePipe, DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    ApiConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [ApiConfigService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: HeaderInterceptor, 
      multi: true,
      deps: [ApiConfigService]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
