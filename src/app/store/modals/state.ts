import { ModalSize } from '@/utils/modal-size';
import { Type } from '@angular/core';

export interface PopupItem {
  component: Type<any> | null;
  size: ModalSize;
}

export const initialPopupItem: PopupItem = {
  component: null,
  size: ModalSize.default
};