import { createAction } from '@ngrx/store';

export const SHOW_LOADING_BAR = '[Core] Show Loading Bar';
export const HIDE_LOADING_BAR = '[Core] Hide Loading Bar';

export const showLoadingBar = createAction(SHOW_LOADING_BAR);

export const hideLoadingBar = createAction(HIDE_LOADING_BAR);
