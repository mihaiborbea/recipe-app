import { ActionReducer, MetaReducer } from '@ngrx/store';

import { LOGOUT } from '../auth/state/auth.actions';

export function cleanState(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    if (action.type === LOGOUT) {
      state = {};
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [cleanState];
