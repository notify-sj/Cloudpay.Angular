export interface MenuItem {
    name?:string;
    iconClasses?:string;
    path?: Array<string>;
    routePath?: Array<string>;
    children?: Array<MenuItem>;
}