import { Type } from '@angular/core';

export interface PopupItem {
  component: Type<any> | null;
  size: any;
}

export const initialPopupItem: PopupItem = {
  component: null,
  size: null
};