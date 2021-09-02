import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { switchMap, take } from 'rxjs/operators';

import { ShoppingList } from 'src/app/shopping-list/domain/shopping-list.model';
import * as fromApp from '../../state/app.store';
import { selectShoppingList } from 'src/app/shopping-list/state/shopping-list.selectors';
import * as ShoppingListActions from '../../shopping-list/state/shopping-list.actions';

@Injectable({ providedIn: 'root' })
export class ShoppingListResolver
  implements Resolve<{ shoppingList: ShoppingList }>
{
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

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
