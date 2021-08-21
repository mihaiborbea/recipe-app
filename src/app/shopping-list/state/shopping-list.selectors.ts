import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState } from 'src/app/state/app.store';
import { State as selectShpListState } from './shopping-list.reducer';

const selectShpListState = createFeatureSelector<AppState, selectShpListState>(
  'shoppingList'
);

export const selectShoppingList = createSelector(
  selectShpListState,
  (state: selectShpListState) => state.shoppingList
);

export const selectEditIndex = createSelector(
  selectShpListState,
  (state: selectShpListState) => state.editIndex
);
