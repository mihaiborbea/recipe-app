import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import * as ShoppingListActions from './shopping-list.actions';
import { ShoppingListService } from '../services/shopping-list.service';
import { selectAuthUser } from 'client/app/auth/state/auth.selectors';
import { selectShoppingList } from './shopping-list.selectors';
import { AppState } from 'client/app/core/state/app.store';

@Injectable()
export class ShoppingListEffects {
  fetchShoppingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShoppingListActions.fetchShoppingList),
      withLatestFrom(this.store.select(selectAuthUser)),
      switchMap(([_, user]) =>
        this.shoppingListService.getShoppingList(user.id)
      ),
      map((shoppingList) =>
        ShoppingListActions.setShoppingList({ shoppingList })
      )
    )
  );

  storeShoppingList$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ShoppingListActions.storeShoppingList,
          ShoppingListActions.addIngredient,
          ShoppingListActions.updateIngredient,
          ShoppingListActions.deleteIngredient
        ),
        withLatestFrom(
          this.store.select(selectShoppingList),
          this.store.select(selectAuthUser)
        ),
        switchMap(([_, shoppingList, user]) =>
          this.shoppingListService.storeUserShoppingList(shoppingList, user.id)
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private shoppingListService: ShoppingListService,
    private store: Store<AppState>
  ) {}
}
