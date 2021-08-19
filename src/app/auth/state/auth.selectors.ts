import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState } from 'src/app/state/app.store';
import { State as AuthState } from './auth.reducer';

const selectAuthState = createFeatureSelector<AppState, AuthState>('auth');

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
