import { Recipe } from '../domain/recipe.model';

export interface RecipesState {
  allRecipes: Recipe[];
  userRecipes: Recipe[];
}

export const initialState: RecipesState = {
  allRecipes: [],
  userRecipes: [],
};
