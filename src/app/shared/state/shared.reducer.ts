import { createReducer, on } from '@ngrx/store';

import { initialState } from './shared.state';
import * as SharedActions from './shared.actions';

export const sharedReducer = createReducer(
  initialState,

  on(SharedActions.setLoadingBar, (state, action) => {
    return {
      ...state,
      showLoading: action.status,
    };
  })
);
