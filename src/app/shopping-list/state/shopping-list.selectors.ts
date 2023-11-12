import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ShoppingListState } from './shopping-list.state';

export const SHOPPING_LIST_STATE_NAME = 'shoppingList';

const selectShpListState = createFeatureSelector<ShoppingListState>(
  SHOPPING_LIST_STATE_NAME
);

export const selectIngredientsCount = createSelector(
  selectShpListState,
  (state: ShoppingListState) => state.shoppingList?.ingredients.length
);

export const selectShoppingList = createSelector(
  selectShpListState,
  (state: ShoppingListState) => state.shoppingList
);

export const selectEditIndex = createSelector(
  selectShpListState,
  (state: ShoppingListState) => state.editIndex
);
