import { ComponentData } from '@/utils/component-data';
import { ModalSize } from '@/utils/modal-size';
import { PopupItem } from '@/utils/popup-item';
import { Component } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
    _popupItem: PopupItem;
    selectedSize: ModalSize = ModalSize.sm;

    openDashboardSettings() {
        let cd: ComponentData = {
            data: {}
        };
        this._popupItem = {
            component: "DashboardSettingsComponent",
            size: this.selectedSize,
            title: "Dashboard Settings",
            footer: true,
            data: cd,
            okButtonLabel: "Save"
        };
    }
}
