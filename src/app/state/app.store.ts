import { ActionReducerMap } from '@ngrx/store';

import { CoreState } from '../core/state/core.state';
import { CORE_STATE_NAME } from '../core/state/core.selector';
import { coreReducer } from '../core/state/core.reducer';
import { AuthState } from '../auth/state/auth.state';
import { AUTH_STATE_NAME } from '../auth/state/auth.selectors';
import { authReducer } from '../auth/state/auth.reducer';

export interface AppState {
  [CORE_STATE_NAME]: CoreState;
  [AUTH_STATE_NAME]: AuthState;
}

export const appReducer: ActionReducerMap<AppState> = {
  [CORE_STATE_NAME]: coreReducer,
  [AUTH_STATE_NAME]: authReducer,
};
