import { createFeatureSelector, createSelector } from '@ngrx/store';

import { RecipesState } from './recipes.state';

export const RECIPES_STATE_NAME = 'recipes';

const selectRecipesState =
  createFeatureSelector<RecipesState>(RECIPES_STATE_NAME);

export const selectAllRecipes = createSelector(
  selectRecipesState,
  (state: RecipesState) => state.allRecipes
);

export const selectUserRecipes = createSelector(
  selectRecipesState,
  (state: RecipesState) => state.userRecipes
);
