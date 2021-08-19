import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../shopping-list/state/shopping-list.reducer';
import * as fromAuth from '../auth/state/auth.reducer';
import * as fromRecipes from '../recipes/state/recipes.reducer';

export interface AppState {
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
  recipes: fromRecipes.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer,
  recipes: fromRecipes.recipesReducer,
};
