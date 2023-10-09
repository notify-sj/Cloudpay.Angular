import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MenuState } from "./state";

const selectMenuStateFeature = createFeatureSelector<MenuState>('menuState');

export const selectMenuState = createSelector(
    selectMenuStateFeature,
    (state: any) => state.menu
);