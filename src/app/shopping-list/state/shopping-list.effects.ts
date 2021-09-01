import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, mergeMap, withLatestFrom } from 'rxjs/operators';

import * as ShoppingListActions from './shopping-list.actions';
import * as fromApp from '../../state/app.store';
import { ShoppingListService } from '../services/shopping-list.service';
import { selectAuthUser } from 'src/app/auth/state/auth.selectors';
import { selectShoppingList } from './shopping-list.selectors';
import * as SharedActions from 'src/app/shared/state/shared.actions';

@Injectable()
export class ShoppingListEffects {
  fetchShoppingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShoppingListActions.fetchShoppingList),
      withLatestFrom(this.store.select(selectAuthUser)),
      concatMap(([_, user]) => {
        return this.shoppingListService.getShoppingList(user.id);
      }),
      mergeMap((shoppingList) => {
        return [
          SharedActions.setLoadingBar({ status: false }),
          ShoppingListActions.setShoppingList({ shoppingList }),
        ];
      })
    )
  );

  storeShoppingList$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ShoppingListActions.storeShoppingList),
        withLatestFrom(
          this.store.select(selectShoppingList),
          this.store.select(selectAuthUser)
        ),
        concatMap(([_, shoppingList, user]) => {
          return this.shoppingListService.storeUserShoppingList(
            shoppingList,
            user.id
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) {}
}
