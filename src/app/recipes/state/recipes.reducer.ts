import { createReducer, on } from '@ngrx/store';

import * as RecipesActions from './recipes.actions';
import { initialState } from './recipes.state';

export const recipesReducer = createReducer(
  initialState,

  on(RecipesActions.createRecipe, (state, action) => ({
    ...state,
    recipes: [{ ...action.recipe }, ...state.recipes],
  })),

  on(RecipesActions.updateRecipe, (state, action) => ({
    ...state,
    recipes: state.recipes.map((recipe) =>
      recipe.id === action.recipe.id ? { ...action.recipe } : recipe
    ),
  })),

  on(RecipesActions.deleteRecipe, (state, action) => ({
    ...state,
    recipes: state.recipes.filter((recipe) => recipe.id !== action.recipe.id),
  })),

  on(RecipesActions.setRecipes, (state, action) => ({
    ...state,
    recipes: [...action.recipes],
  }))
);
