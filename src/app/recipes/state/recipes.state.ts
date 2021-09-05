import { Recipe } from '../domain/recipe.model';

export interface RecipesState {
  recipes: Recipe[];
}

export const initialState: RecipesState = {
  recipes: [],
};
