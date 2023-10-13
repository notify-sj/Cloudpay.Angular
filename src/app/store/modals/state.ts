import { ModalSize } from '@/utils/modal-size';

export interface PopupItem {
  component: string;
  size: ModalSize;
}

export const initialPopupItem: PopupItem = {
  component: null,
  size: ModalSize.default
};