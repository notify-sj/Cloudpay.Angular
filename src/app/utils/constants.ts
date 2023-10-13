import { InjectionToken, Type } from "@angular/core";
import { NotificationDashboardComponent } from "@components/notification-dashboard/notification-dashboard.component";
import { ComponentData } from "./component-data";

export const ComponentType: Map<string, Type<any>> = new Map([
    [NotificationDashboardComponent.name, NotificationDashboardComponent]
]);

export const component_data = new InjectionToken<ComponentData>(null);
