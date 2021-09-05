import { createFeatureSelector, createSelector } from '@ngrx/store';

import { RecipesState } from './recipes.state';

export const RECIPES_STATE_NAME = 'recipes';

const selectRecipesState =
  createFeatureSelector<RecipesState>(RECIPES_STATE_NAME);

export const selectRecipes = createSelector(
  selectRecipesState,
  (state: RecipesState) => state.recipes
);
