export interface MenuItemDto {
    name?: string;
    iconClasses?: string;
    path?: Array<string>;
    routePath?: Array<string>;
    children?: Array<MenuItemDto>;
}

export class MenuItem {
    id: number;
    parentId: number;
    name: string;
    iconClasses: string;
    path: Array<string>;
    children: Array<MenuItem>;
}
