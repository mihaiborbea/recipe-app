import { createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import { initialState } from './auth.state';

export const authReducer = createReducer(
  initialState,

  on(
    AuthActions.loginStart,
    AuthActions.signupStart,
    AuthActions.passwordRecoveryStart,
    AuthActions.passwordResetStart,
    (state) => ({
      ...state,
      error: null,
      loading: true,
    })
  ),

  on(AuthActions.autoLogin, (state) => ({
    ...state,
    loading: true,
  })),

  on(
    AuthActions.passwordRecoveryEnd,
    AuthActions.passwordResetEnd,
    (state) => ({
      ...state,
      loading: false,
    })
  ),

  on(AuthActions.authenticateSuccess, (state, action) => ({
    ...state,
    error: null,
    loading: false,
    user: action.user,
  })),

  on(AuthActions.authenticateFail, (state, action) => ({
    ...state,
    user: null,
    error: action.errorMessage,
    loading: false,
  })),

  on(AuthActions.logout, (state) => ({
    ...state,
    user: null,
  })),

  on(AuthActions.clearError, (state) => ({
    ...state,
    error: null,
  }))
);
