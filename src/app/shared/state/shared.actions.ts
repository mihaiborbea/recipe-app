import { createAction, props } from '@ngrx/store';

export const SET_LOADING_BAR = '[Shared] Set Loading Bar';

export const setLoadingBar = createAction(
  SET_LOADING_BAR,
  props<{ status: boolean }>()
);
