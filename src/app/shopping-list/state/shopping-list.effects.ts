import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map, switchMap, withLatestFrom } from 'rxjs/operators';

import * as ShoppingListActions from './shopping-list.actions';
import * as fromApp from '../../state/app.store';
import { ShoppingListService } from '../services/shopping-list.service';
import { selectAuthUser } from 'src/app/auth/state/auth.selectors';
import { selectShoppingList } from './shopping-list.selectors';

@Injectable()
export class ShoppingListEffects {
  fetchShoppingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShoppingListActions.fetchShoppingList),
      withLatestFrom(this.store.select(selectAuthUser)),
      concatMap(async ([_, user]) => {
        return await this.shoppingListService.getShoppingList(user.id);
      }),
      map((shoppingList) => {
        return ShoppingListActions.setShoppingList({ shoppingList });
      })
    )
  );

  storeShoppingList$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ShoppingListActions.storeShoppingList),
        withLatestFrom(this.store.select(selectShoppingList)),
        switchMap(([_, shoppingList]) => {
          return this.shoppingListService.storeUserShoppingList(shoppingList);
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
