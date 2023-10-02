import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { switchMap, take } from 'rxjs/operators';

import { ShoppingList } from 'src/app/shopping-list/domain/shopping-list.model';
import { selectShoppingList } from 'src/app/shopping-list/state/shopping-list.selectors';
import * as ShoppingListActions from '../../shopping-list/state/shopping-list.actions';
import { AppState } from '../state/app.store';

@Injectable({ providedIn: 'root' })
export class ShoppingListResolver
  
{
  constructor(private store: Store<AppState>, private actions$: Actions) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | { shoppingList: ShoppingList }
    | Observable<{ shoppingList: ShoppingList }>
    | Promise<{ shoppingList: ShoppingList }> {
    return this.store.select(selectShoppingList).pipe(
      take(1),
      switchMap((shoppingList) => {
        if (!shoppingList) {
          this.store.dispatch(ShoppingListActions.fetchShoppingList());
          return this.actions$.pipe(
            ofType(ShoppingListActions.SET_SHOPPING_LIST),
            take(1)
          );
        } else {
          return of({ shoppingList });
        }
      })
    );
  }
}
