import { createReducer, on } from '@ngrx/store';

import { initialState } from './core.state';
import * as CoreActions from './core.actions';

export const coreReducer = createReducer(
  initialState,

  on(CoreActions.showLoadingBar, (state, _) => {
    return {
      ...state,
      showLoading: true,
    };
  }),

  on(CoreActions.hideLoadingBar, (state, _) => {
    return {
      ...state,
      showLoading: false,
    };
  })
);
