import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState } from 'src/app/state/app.store';
import { State as RecipesState } from './recipes.reducer';

const selectRecipesState = createFeatureSelector<AppState, RecipesState>(
  'recipes'
);

export const selectRecipes = createSelector(
  selectRecipesState,
  (state: RecipesState) => state.recipes
);
