import { Action, createReducer, on } from '@ngrx/store';
import { Recipe } from '../domain/recipe.model';

import * as RecipesActions from './recipes.actions';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [],
};

const _recipesReducer = createReducer(
  initialState,

  on(RecipesActions.addRecipe, (state, action) => ({
    ...state,
    recipes: state.recipes.concat({ ...action.recipe }),
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

export function recipesReducer(state: State, action: Action) {
  return _recipesReducer(state, action);
}
