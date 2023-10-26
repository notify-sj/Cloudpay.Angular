import { component_data } from '@/utils/component-constant';
import { ComponentData } from '@/utils/component-data';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { ModalActions } from '@modules/shared/components/modal/modal-actions';

@Component({
  selector: 'app-dashboard-settings',
  templateUrl: './dashboard-settings.component.html',
  styleUrls: ['./dashboard-settings.component.scss']
})
export class DashboardSettingsComponent implements OnInit, ModalActions {
  @Input() _componentData: ComponentData;
  constructor(@Inject(component_data) private componentData: ComponentData) { }
  
  onModalOk(): void {
    console.log('Ok button clicked in dynamic component');
  }
  
  ngOnInit(): void {
    this._componentData = this._componentData || this.componentData;
  }
}
