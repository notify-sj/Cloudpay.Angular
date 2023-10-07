import { Type } from '@angular/core';

export interface PopupItem {
  component: Type<any> | null;
  data: any;
}

export const initialPopupItem: PopupItem = {
  component: null,
  data: null
};