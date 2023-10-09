import { MenuType } from "@/utils/menu-type";

export class MenuState {
    type: MenuType = MenuType.MENU;
    activeIds: number[] = [];
    error: any;
};

export const initialState: MenuState = {
    type: MenuType.MENU,
    activeIds: [],
    error: null
  };
