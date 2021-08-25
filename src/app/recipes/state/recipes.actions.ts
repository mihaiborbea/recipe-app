import { createAction, props } from '@ngrx/store';

import { Recipe } from '../domain/recipe.model';

export const SET_RECIPES = '[Recipes] Set Recipes';
export const FETCH_RECIPES = '[Recipes] Fetch Recipes';
export const STORE_RECIPES = '[Recipes] Store Recipes';
export const ADD_RECIPE = '[Recipes] Add Recipe';
export const UPDATE_RECIPE = '[Recipes] Update Recipe';
export const DELETE_RECIPE = '[Recipes] Delete Recipe';

export const addRecipe = createAction(
  ADD_RECIPE,
  props<{
    recipe: Recipe;
  }>()
);

export const updateRecipe = createAction(
  UPDATE_RECIPE,
  props<{
    index: number;
    recipe: Recipe;
  }>()
);

export const deleteRecipe = createAction(
  DELETE_RECIPE,
  props<{
    index: number;
  }>()
);

export const setRecipes = createAction(
  SET_RECIPES,
  props<{
    recipes: Recipe[];
  }>()
);

export const fetchRecipes = createAction(FETCH_RECIPES);

export const storeRecipes = createAction(STORE_RECIPES);
