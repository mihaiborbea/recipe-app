import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../shopping-list/state/shopping-list.reducer';
import * as fromAuth from '../auth/state/auth.reducer';
import { CoreState } from '../core/state/core.state';
import { CORE_STATE_NAME } from '../core/state/core.selector';
import { coreReducer } from '../core/state/core.reducer';

export interface AppState {
  [CORE_STATE_NAME]: CoreState;
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  [CORE_STATE_NAME]: coreReducer,
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer,
};
