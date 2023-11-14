import { createAction, props } from '@ngrx/store';

import { Ingredient } from '../../shared/domain/ingredient.model';
import { ShoppingList } from '../domain/shopping-list.model';
import { Recipe } from 'src/app/recipes/domain/recipe.model';

export const FETCH_SHOPPING_LIST = '[Shopping List] Fetch Shopping List';
export const SET_SHOPPING_LIST = '[Shopping List] Set Shopping List';
export const STORE_SHOPPING_LIST = '[Shopping List] Store Shopping List';
export const ADD_INGREDIENT = '[Shopping List] Add Ingredient';
export const ADD_INGREDIENTS = '[Shopping List] Add Ingredients';
export const UPDATE_INGREDIENT = '[Shopping List] Update Ingredient';
export const DELETE_INGREDIENT = '[Shopping List] Delete Ingredient';
export const START_EDIT_INGREDIENT = '[Shopping List] Start Edit Ingredient';
export const STOP_EDIT_INGREDIENT = '[Shopping List] Stop Edit Ingredient';

export const fetchShoppingList = createAction(FETCH_SHOPPING_LIST);

export const storeShoppingList = createAction(STORE_SHOPPING_LIST);

export const setShoppingList = createAction(
  SET_SHOPPING_LIST,
  props<{ shoppingList: ShoppingList }>()
);

export const addIngredient = createAction(
  ADD_INGREDIENT,
  props<{
    rIndex: number;
    ingredient: Ingredient;
  }>()
);

export const addIngredients = createAction(
  ADD_INGREDIENTS,
  props<{
    recipe: Recipe;
    ingredients: Ingredient[];
  }>()
);

export const updateIngredient = createAction(
  UPDATE_INGREDIENT,
  props<{
    rIndex: number;
    iIndex: number;
    ingredient: Ingredient;
  }>()
);

export const deleteIngredient = createAction(
  DELETE_INGREDIENT,
  props<{
    recipeIndex: number;
    ingredientIndex: number;
  }>()
);

export const startEditIngredient = createAction(
  START_EDIT_INGREDIENT,
  props<{
    recipeIndex: number;
    ingredientIndex: number;
  }>()
);

export const stopEditIngredient = createAction(STOP_EDIT_INGREDIENT);
