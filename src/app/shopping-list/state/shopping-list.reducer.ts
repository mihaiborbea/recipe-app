import { createReducer, on } from '@ngrx/store';

import * as ShoppingListActions from './shopping-list.actions';
import { initialState } from './shopping-list.state';

export const shoppingListReducer = createReducer(
  initialState,

  on(ShoppingListActions.setShoppingList, (state, action) => ({
    ...state,
    shoppingList: action.shoppingList,
  })),

  on(ShoppingListActions.addIngredient, (state, action) => {
    const newState = { ...state };
    newState.shoppingList.ingredients.push(action.ingredient);
    return newState;
  }),

  on(ShoppingListActions.addIngredients, (state, action) => {
    const newState = { ...state };
    newState.shoppingList.ingredients.push(...action.ingredients);
    return newState;
  }),

  on(ShoppingListActions.updateIngredient, (state, action) => {
    const newState = { ...state };
    newState.editIndex = -1;
    newState.shoppingList.ingredients = state.shoppingList.ingredients.map(
      (ingredient, index) =>
        index === state.editIndex ? { ...action.ingredient } : ingredient
    );
    return newState;
  }),

  on(ShoppingListActions.deleteIngredient, (state) => {
    const newState = { ...state };
    newState.editIndex = -1;
    newState.shoppingList.ingredients = state.shoppingList.ingredients.filter(
      (_, index) => index !== state.editIndex
    );
    return newState;
  }),

  on(ShoppingListActions.startEditIngredient, (state, action) => ({
    ...state,
    editIndex: action.ingredientIndex,
  })),

  on(ShoppingListActions.stopEditIngredient, (state) => ({
    ...state,
    editIndex: -1,
  }))
);
