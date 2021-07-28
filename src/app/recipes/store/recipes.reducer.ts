import { Action, createReducer, on } from '@ngrx/store';
import { Recipe } from '../recipe.model';

import * as RecipesActions from '../store/recipes.actions';

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
    recipes: state.recipes.map((recipe, index) =>
      index === action.index ? { ...action.recipe } : recipe
    ),
  })),

  on(RecipesActions.deleteRecipe, (state, action) => ({
    ...state,
    recipes: state.recipes.filter((_, index) => index !== action.index),
  })),

  on(RecipesActions.setRecipes, (state, action) => ({
    ...state,
    recipes: [...action.recipes],
  }))
);

export function recipesReducer(state: State, action: Action) {
  return _recipesReducer(state, action);
}
