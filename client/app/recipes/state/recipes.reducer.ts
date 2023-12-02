import { createReducer, on } from '@ngrx/store';

import * as RecipesActions from './recipes.actions';
import { initialState } from './recipes.state';

export const recipesReducer = createReducer(
  initialState,

  on(RecipesActions.createRecipe, (state, action) => ({
    ...state,
    allRecipes: [{ ...action.recipe }, ...state.allRecipes],
    userRecipes: [{ ...action.recipe }, ...state.userRecipes],
  })),

  on(RecipesActions.updateRecipe, (state, action) => ({
    ...state,
    allRecipes: state.allRecipes.map((recipe) =>
      recipe.id === action.recipe.id ? { ...action.recipe } : recipe
    ),
    userRecipes: state.userRecipes.map((recipe) =>
      recipe.id === action.recipe.id ? { ...action.recipe } : recipe
    ),
  })),

  on(RecipesActions.deleteRecipe, (state, action) => ({
    ...state,
    allRecipes: state.allRecipes.filter(
      (recipe) => recipe.id !== action.recipe.id
    ),
    userRecipes: state.userRecipes.filter(
      (recipe) => recipe.id !== action.recipe.id
    ),
  })),

  on(RecipesActions.setAllRecipes, (state, action) => ({
    ...state,
    allRecipes: [...action.recipes],
  })),

  on(RecipesActions.setUserRecipes, (state, action) => ({
    ...state,
    userRecipes: [...action.recipes],
  }))
);
