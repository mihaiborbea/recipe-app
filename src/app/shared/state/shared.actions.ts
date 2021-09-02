import { createAction } from '@ngrx/store';

export const SHOW_LOADING_BAR = '[Shared] Show Loading Bar';
export const HIDE_LOADING_BAR = '[Shared] Hide Loading Bar';

export const showLoadingBar = createAction(SHOW_LOADING_BAR);

export const hideLoadingBar = createAction(HIDE_LOADING_BAR);
