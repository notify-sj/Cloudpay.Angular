import { ComponentData } from "./component-data";
import { ModalSize } from "./modal-size";

export class PopupItem {
    component: string;
    size: ModalSize;
    title: string;
    footer: boolean;
    data: ComponentData;
}
