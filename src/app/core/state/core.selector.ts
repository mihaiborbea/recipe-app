import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CoreState } from './core.state';

export const CORE_STATE_NAME = 'core';

const selectCoreState = createFeatureSelector<CoreState>(CORE_STATE_NAME);

export const selectCoreLoading = createSelector(selectCoreState, (state) => {
  return state.showLoading;
});
