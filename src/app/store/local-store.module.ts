import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { sessionVariableReducer } from './auth/reducer';
import { uiReducer } from './ui/reducer';
import { userReducer } from './user/reducer';
import { menuStateReducer } from './menuitem/reducer';
import { MenuItemEffects } from './menuitem/effects';
import { SessionVariableEffects } from './auth/effects';
import { UserEffects } from './user/effects';
import { EffectsModule } from '@ngrx/effects';
import { notificationReducer } from './notifications/reducers';
import { NotificationEffects } from './notifications/effects';
import { modalReducer } from './modals/reducers';
import { ModalEffects } from './modals/effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({
        auth: sessionVariableReducer, 
        ui: uiReducer, 
        user: userReducer,
        menuState: menuStateReducer,
        notification: notificationReducer,
        modal: modalReducer
    }),
    EffectsModule.forRoot([
      UserEffects, 
      SessionVariableEffects, 
      MenuItemEffects,
      NotificationEffects,
      ModalEffects
    ])
  ]
})
export class LocalStoreModule { }
