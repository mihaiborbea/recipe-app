import { Action, createReducer, on } from '@ngrx/store';

import { Ingredient } from '../../shared/domain/ingredient.model';
import { ShoppingList } from '../domain/shopping-list.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  shoppingList: ShoppingList;
  ingredients: Ingredient[];
  editIndex: number;
}

const initialState: State = {
  shoppingList: null,
  ingredients: [],
  editIndex: -1,
};

const _shoppingListReducer = createReducer(
  initialState,

  on(ShoppingListActions.addIngredient, (state, action) => ({
    ...state,
    ingredients: state.ingredients.concat(action.ingredient),
  })),

  on(ShoppingListActions.addIngredients, (state, action) => ({
    ...state,
    ingredients: state.ingredients.concat(...action.ingredients),
  })),

  on(ShoppingListActions.updateIngredient, (state, action) => ({
    ...state,
    editIndex: -1,
    ingredients: state.ingredients.map((ingredient, index) =>
      index === state.editIndex ? { ...action.ingredient } : ingredient
    ),
  })),

  on(ShoppingListActions.deleteIngredient, (state) => ({
    ...state,
    editIndex: -1,
    ingredients: state.ingredients.filter(
      (_, index) => index !== state.editIndex
    ),
  })),

  on(ShoppingListActions.startEdit, (state, action) => ({
    ...state,
    editIndex: action.index,
  })),

  on(ShoppingListActions.stopEdit, (state) => ({
    ...state,
    editIndex: -1,
  }))
);

export function shoppingListReducer(state: State, action: Action) {
  return _shoppingListReducer(state, action);
}
