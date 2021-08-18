import { createSelector } from '@ngrx/store';

import { AppState } from 'src/app/store/app.store';
import { State } from './auth.reducer';

const selectAuth = (state: AppState) => state.auth;

export const selectAuthLoading = createSelector(
  selectAuth,
  (state: State) => state.loading
);

export const selectAuthError = createSelector(
  selectAuth,
  (state: State) => state.error
);

export const selectAuthUser = createSelector(
  selectAuth,
  (state: State) => state.user
);
