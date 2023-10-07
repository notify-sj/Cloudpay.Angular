import {
    NAVBAR_LIGHT_VARIANTS,
    SIDEBAR_LIGHT_SKINS
} from '@/utils/themes';
import * as Actions from './actions';
import { UiAction } from './actions';
import initialState, { UiState } from './state';

export function uiReducer(state: UiState = initialState, action: UiAction) {
    switch (action.type) {
        case Actions.TOGGLE_SIDEBAR_MENU:
            return {
                ...state,
                menuSidebarCollapsed: !state.menuSidebarCollapsed
            };
        case Actions.SET_NAVBAR_VARIANT:
            let navbarVariant: string;
            navbarVariant =
                    action.payload || NAVBAR_LIGHT_VARIANTS[0].value;
            return {
                ...state,
                navbarVariant
            };
        case Actions.SET_SIDEBAR_SKIN:
            let sidebarSkin: string;
            sidebarSkin = action.payload || SIDEBAR_LIGHT_SKINS[0].value;
            return {
                ...state,
                sidebarSkin
            };
        default:
            return state;
    }
}
