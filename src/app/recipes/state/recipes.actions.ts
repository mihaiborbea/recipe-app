import { createAction, props } from '@ngrx/store';

import { Recipe } from '../domain/recipe.model';

export const SET_RECIPES = '[Recipes] Set Recipes';
export const FETCH_RECIPES = '[Recipes] Fetch Recipes';
export const CREATE_RECIPE = '[Recipes] Create Recipe';
export const UPDATE_RECIPE = '[Recipes] Update Recipe';
export const DELETE_RECIPE = '[Recipes] Delete Recipe';
export const ADD_RECIPE_TO_SHOPPING_LSIT =
  '[Recipes] Add Recipe to Shopping List';

export const createRecipe = createAction(
  CREATE_RECIPE,
  props<{
    recipe: Recipe;
  }>()
);

export const updateRecipe = createAction(
  UPDATE_RECIPE,
  props<{
    recipe: Recipe;
  }>()
);

export const deleteRecipe = createAction(
  DELETE_RECIPE,
  props<{
    recipe: Recipe;
  }>()
);

export const setRecipes = createAction(
  SET_RECIPES,
  props<{
    recipes: Recipe[];
  }>()
);
export const addRecipeToShoppingList = createAction(
  ADD_RECIPE_TO_SHOPPING_LSIT,
  props<{ recipe: Recipe }>()
);

export const fetchRecipes = createAction(FETCH_RECIPES);
