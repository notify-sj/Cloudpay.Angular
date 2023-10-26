export interface MenuItemDto {
    name?: string;
    iconClasses?: string;
    path?: Array<string>;
    routePath?: Array<string>;
    children?: Array<MenuItemDto>;
    isDefault?: boolean;
}

export class MenuItem {
    id: number;
    parentId: number;
    name: string;
    iconClasses: string;
    path: Array<string>;
    children: Array<MenuItem>;
    isDefault: boolean;
}

export const MENU: Array<MenuItem> = [];
