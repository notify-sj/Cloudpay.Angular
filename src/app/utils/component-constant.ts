import { InjectionToken, Type } from "@angular/core";
import { NotificationDashboardComponent } from "@components/notification-dashboard/notification-dashboard.component";
import { ComponentData } from "./component-data";
import { NotificationListComponent } from "@components/notification-list/notification-list.component";
import { DashboardSettingsComponent } from "@modules/self/components/dashboard/dashboard-settings/dashboard-settings.component";

export const ComponentType: Map<string, Type<any>> = new Map([
    [NotificationDashboardComponent.name, NotificationDashboardComponent]
]);

ComponentType.set(NotificationListComponent.name, NotificationListComponent);
ComponentType.set(DashboardSettingsComponent.name, DashboardSettingsComponent);

export const component_data = new InjectionToken<ComponentData>(null);
