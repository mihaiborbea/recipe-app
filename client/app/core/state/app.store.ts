import { ActionReducerMap } from '@ngrx/store';

import { CORE_STATE_NAME } from './core.selector';
import { CoreState } from './core.state';
import { coreReducer } from './core.reducer';
import { AUTH_STATE_NAME } from '../../auth/state/auth.selectors';
import { AuthState } from '../../auth/state/auth.state';
import { authReducer } from '../../auth/state/auth.reducer';

export interface AppState {
  [CORE_STATE_NAME]: CoreState;
  [AUTH_STATE_NAME]: AuthState;
}

export const appReducer: ActionReducerMap<AppState> = {
  [CORE_STATE_NAME]: coreReducer,
  [AUTH_STATE_NAME]: authReducer,
};
