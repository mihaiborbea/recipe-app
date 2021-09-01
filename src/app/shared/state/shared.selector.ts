import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SharedState } from './shared.state';

export const SHARED_STATE_NAME = 'shared';

const selectSharedState = createFeatureSelector<SharedState>(SHARED_STATE_NAME);

export const selectSharedLoading = createSelector(
  selectSharedState,
  (state) => {
    return state.showLoading;
  }
);
