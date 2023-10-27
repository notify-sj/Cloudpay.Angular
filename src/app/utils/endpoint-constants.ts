
export enum Endpoint {
    ChangePassword,
    SessionVariable,
    LoginConfig,
    Profile,
    ProfileDetail,
    AboutMeDetail,
    Notification,
    Menu,
    AssignedUnits,
    SwitchUnit,
    AssignedRoles,
    SwitchRole
}

export class EndpointDetail {
    type?: string;
    url?: string;
    title?: string;

    constructor(_type: string, _url: string, _title: string) {
        this.type = _type;
        this.url = _url;
        this.title = _title;
    }
}

export const Endpoints: Map<Endpoint, EndpointDetail> = new Map([
    [Endpoint.ChangePassword, new EndpointDetail("hrms", "Employee/changepassword", "Change Password")]
]);

Endpoints.set(Endpoint.SessionVariable, new EndpointDetail("admin", "admin/session", "Session"));
Endpoints.set(Endpoint.LoginConfig, new EndpointDetail("hrms", "Employee/loginconfig", "Login Config"));
Endpoints.set(Endpoint.Profile, new EndpointDetail("hrms", "Employee/Profile", "User Profile"));
Endpoints.set(Endpoint.ProfileDetail, new EndpointDetail("hrms", "Employee/ProfileDetail", "User Profile Detail"));
Endpoints.set(Endpoint.AboutMeDetail, new EndpointDetail("hrms", "Employee/AboutMeDetail", "About Me Detail"));
Endpoints.set(Endpoint.Notification, new EndpointDetail("notification", "Notification", "User Notification"));
Endpoints.set(Endpoint.Menu, new EndpointDetail("admin", "admin/menu/Angular", "Menu"));
Endpoints.set(Endpoint.AssignedUnits, new EndpointDetail("admin", "Admin/unit", "Assigned Units"));
Endpoints.set(Endpoint.SwitchUnit, new EndpointDetail("admin", "Admin/switchUnit", "Switch Unit"));
Endpoints.set(Endpoint.AssignedRoles, new EndpointDetail("admin", "Admin/role", "Assigned Role"));
Endpoints.set(Endpoint.SwitchRole, new EndpointDetail("admin", "Admin/switchRole", "Switch Role"));

