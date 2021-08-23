import { Action, createReducer, on } from '@ngrx/store';
import cloneDeep from 'lodash.clonedeep';

import { ShoppingList } from '../domain/shopping-list.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  shoppingList: ShoppingList;
  editIndex: number;
}

const initialState: State = {
  shoppingList: null,
  editIndex: -1,
};

const _shoppingListReducer = createReducer(
  initialState,

  on(ShoppingListActions.setShoppingList, (state, action) => ({
    ...state,
    shoppingList: action.shoppingList,
  })),

  on(ShoppingListActions.addIngredient, (state, action) => {
    const newState = cloneDeep(state);
    newState.shoppingList.ingredients.concat(action.ingredient);
    return newState;
  }),

  on(ShoppingListActions.addIngredients, (state, action) => {
    const newState = cloneDeep(state);
    newState.shoppingList.ingredients = state.shoppingList.ingredients.concat(
      ...action.ingredients
    );
    return newState;
  }),

  on(ShoppingListActions.updateIngredient, (state, action) => {
    const newState = cloneDeep(state);
    newState.editIndex = -1;
    newState.shoppingList.ingredients.map((ingredient, index) =>
      index === state.editIndex ? { ...action.ingredient } : ingredient
    );
    return newState;
  }),

  on(ShoppingListActions.deleteIngredient, (state) => {
    const newState = cloneDeep(state);
    newState.editIndex = -1;
    newState.shoppingList.ingredients.filter(
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

export function shoppingListReducer(state: State, action: Action) {
  return _shoppingListReducer(state, action);
}
