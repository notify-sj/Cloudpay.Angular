
export enum Endpoint {
    ChangePassword,
    SessionVariable,
    LoginConfig,
    Profile,
    ProfileDetail,
    AboutMeDetail,
    AddressDetail,
    Notification,
    Menu,
    AssignedUnits,
    SwitchUnit,
    AssignedRoles,
    SwitchRole,
    EmpTabs,
    Master
}

export class EndpointDetail {
    type?: string;
    url?: string;
    title?: string;
    useCache?: boolean;

    constructor(_type: string, _url: string, _title: string, _cache: boolean = false) {
        this.type = _type;
        this.url = _url;
        this.title = _title;
        this.useCache = _cache;
    }
}

export const Endpoints: Map<Endpoint, EndpointDetail> = new Map([
    [Endpoint.ChangePassword, new EndpointDetail("hrms", "Employee/changepassword", "Change Password")]
]);

Endpoints.set(Endpoint.SessionVariable, new EndpointDetail("admin", "admin/session", "Session", true));
Endpoints.set(Endpoint.LoginConfig, new EndpointDetail("hrms", "Employee/loginconfig", "Login Config", true));
Endpoints.set(Endpoint.Profile, new EndpointDetail("hrms", "Employee/Profile", "User Profile", true));
Endpoints.set(Endpoint.ProfileDetail, new EndpointDetail("hrms", "Employee/ProfileDetail", "User Profile Detail", true));
Endpoints.set(Endpoint.AboutMeDetail, new EndpointDetail("hrms", "Employee/AboutMeDetail", "About Me Detail", true));
Endpoints.set(Endpoint.AddressDetail, new EndpointDetail("hrms", "Employee/AddressDetail", "Address Detail", true));
Endpoints.set(Endpoint.Notification, new EndpointDetail("notification", "Notification", "User Notification"));
Endpoints.set(Endpoint.Menu, new EndpointDetail("admin", "admin/menu/Angular", "Menu", true));
Endpoints.set(Endpoint.AssignedUnits, new EndpointDetail("admin", "Admin/unit", "Assigned Units", true));
Endpoints.set(Endpoint.EmpTabs, new EndpointDetail("admin", "Admin/empTabs", "Employee Detail Tabs", true));
Endpoints.set(Endpoint.SwitchUnit, new EndpointDetail("admin", "Admin/switchUnit", "Switch Unit"));
Endpoints.set(Endpoint.AssignedRoles, new EndpointDetail("admin", "Admin/role", "Assigned Role", true));
Endpoints.set(Endpoint.SwitchRole, new EndpointDetail("admin", "Admin/switchRole", "Switch Role"));
Endpoints.set(Endpoint.Master, new EndpointDetail("admin", "Master/Data", "Master Data", true));

