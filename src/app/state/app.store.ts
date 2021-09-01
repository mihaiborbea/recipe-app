import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../shopping-list/state/shopping-list.reducer';
import * as fromAuth from '../auth/state/auth.reducer';
import * as fromRecipes from '../recipes/state/recipes.reducer';
import { SharedState } from '../shared/state/shared.state';
import { SHARED_STATE_NAME } from '../shared/state/shared.selector';
import { sharedReducer } from '../shared/state/shared.reducer';

export interface AppState {
  [SHARED_STATE_NAME]: SharedState;
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
  recipes: fromRecipes.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  [SHARED_STATE_NAME]: sharedReducer,
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer,
  recipes: fromRecipes.recipesReducer,
};
