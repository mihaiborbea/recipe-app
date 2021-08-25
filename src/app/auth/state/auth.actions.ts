import { createAction, props } from '@ngrx/store';

import { User } from '../domain/user.model';

export const LOGIN_START = '[Auth] Login Start';
export const SIGNUP_START = '[Auth] Signup Start';
export const AUTHENTICATE_SUCCESS = '[Auth] Authenticate Success';
export const AUTHENTICATE_FAIL = '[Auth] Authenticate Fail';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const LOGOUT = '[Auth] Logout';

export const loginStart = createAction(
  LOGIN_START,
  props<{
    email: string;
    password: string;
  }>()
);

export const signupStart = createAction(
  SIGNUP_START,
  props<{
    email: string;
    password: string;
  }>()
);

export const authenticateSuccess = createAction(
  AUTHENTICATE_SUCCESS,
  props<{
    user: User;
    redirect: boolean;
  }>()
);

export const authenticateFail = createAction(
  AUTHENTICATE_FAIL,
  props<{
    errorMessage: string;
  }>()
);

export const clearError = createAction(CLEAR_ERROR);

export const autoLogin = createAction(AUTO_LOGIN);

export const logout = createAction(LOGOUT);
