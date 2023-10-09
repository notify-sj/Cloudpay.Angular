import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PopupItem } from "./state";

const selectModalFeature = createFeatureSelector<PopupItem>('modal');

export const selectModalState = createSelector(
    selectModalFeature,
    (state: any) => state.item
);