import { createAction, props } from '@ngrx/store';

import { User } from '../domain/user.model';

export const LOGIN_WITH_EMAIL = '[Auth] Login With Email';
export const LOGIN_WITH_FB = '[Auth] Login With Facebook';
export const LOGIN_WITH_GG = '[Auth] Login With Google';
export const LOGIN_WITH_MS = '[Auth] Login With Microsoft';
export const SIGNUP_START = '[Auth] Signup Start';
export const PASSWORD_RECOVERY_START = '[Auth] Password Recovery Start';
export const PASSWORD_RECOVERY_END = '[Auth] Password Recovery End';
export const PASSWORD_RESET_START = '[Auth] Password Reset Start';
export const PASSWORD_RESET_END = '[Auth] Password Reset End';
export const CONFIRM_EMAIL_START = '[Auth] Confirm Email Start';
export const CONFIRM_EMAIL_END = '[Auth] Confirm Email End';
export const AUTHENTICATE_SUCCESS = '[Auth] Authenticate Success';
export const AUTHENTICATE_FAIL = '[Auth] Authenticate Fail';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const LOGOUT = '[Auth] Logout';

export const loginWithEmail = createAction(
  LOGIN_WITH_EMAIL,
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

export const passwordRecoveryStart = createAction(
  PASSWORD_RECOVERY_START,
  props<{
    email: string;
  }>()
);

export const passwordResetStart = createAction(
  PASSWORD_RESET_START,
  props<{
    newPassword: string;
    actionCode: string;
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

export const confirmEmailStart = createAction(
  CONFIRM_EMAIL_START,
  props<{ actionCode: string }>()
);

export const confirmEmailEnd = createAction(CONFIRM_EMAIL_END);

export const clearError = createAction(CLEAR_ERROR);

export const autoLogin = createAction(AUTO_LOGIN);

// TODO: maybe have an success / fail flow
export const passwordRecoveryEnd = createAction(PASSWORD_RECOVERY_END);

// TODO: maybe have an success / fail flow
export const passwordResetEnd = createAction(PASSWORD_RESET_END);

export const logout = createAction(LOGOUT);

export const loginWithFacebook = createAction(LOGIN_WITH_FB);

export const loginWithGoogle = createAction(LOGIN_WITH_GG);

export const loginWithMicrosoft = createAction(LOGIN_WITH_MS);
