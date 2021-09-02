import { createReducer, on } from '@ngrx/store';

import { initialState } from './shared.state';
import * as SharedActions from './shared.actions';

export const sharedReducer = createReducer(
  initialState,

  on(SharedActions.showLoadingBar, (state, _) => {
    return {
      ...state,
      showLoading: true,
    };
  }),

  on(SharedActions.hideLoadingBar, (state, _) => {
    return {
      ...state,
      showLoading: false,
    };
  })
);
