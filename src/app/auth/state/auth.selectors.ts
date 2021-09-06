import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthState } from './auth.state';

export const AUTH_STATE_NAME = 'auth';

const selectAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.loading
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);

export const selectAuthUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);
