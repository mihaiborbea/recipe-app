import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ShoppingListState } from './shopping-list.state';

export const SHOPPING_LIST_STATE_NAME = 'shoppingList';

const selectShpListState = createFeatureSelector<ShoppingListState>(
  SHOPPING_LIST_STATE_NAME
);

export const selectIngredientsCount = createSelector(
  selectShpListState,
  (state: ShoppingListState) => {
    return state.shoppingList?.recipes.reduce(
      (acc, slR) => acc + slR.ingredients.length,
      0
    );
  }
);

export const selectShoppingList = createSelector(
  selectShpListState,
  (state: ShoppingListState) => state.shoppingList
);

export const selectEditIndex = createSelector(
  selectShpListState,
  (state: ShoppingListState) => ({
    rIndex: state.editRecipeIndex,
    iIndex: state.editIngredientIndex,
  })
);
