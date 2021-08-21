import { Action, createReducer, on } from '@ngrx/store';

import { Ingredient } from '../../shared/domain/ingredient.model';
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

  on(ShoppingListActions.addIngredient, (state, action) => ({
    ...state,
    ingredients: state.shoppingList.ingredients.concat(action.ingredient),
  })),

  on(ShoppingListActions.addIngredients, (state, action) => ({
    ...state,
    ingredients: state.shoppingList.ingredients.concat(...action.ingredients),
  })),

  on(ShoppingListActions.updateIngredient, (state, action) => ({
    ...state,
    editIndex: -1,
    ingredients: state.shoppingList.ingredients.map((ingredient, index) =>
      index === state.editIndex ? { ...action.ingredient } : ingredient
    ),
  })),

  on(ShoppingListActions.deleteIngredient, (state) => ({
    ...state,
    editIndex: -1,
    ingredients: state.shoppingList.ingredients.filter(
      (_, index) => index !== state.editIndex
    ),
  })),

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
