import { HttpClient, HttpParams } from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { EnvironmentService } from 'src/app/core/services/environment-service.service';
import { ShoppingList } from '../domain/shopping-list.model';
import * as ShoppingListActions from './shopping-list.actions';
import { AuthService } from 'src/app/core/services/auth.service';
import * as fromApp from '../../state/app.store';
import { selectShoppingList } from './shopping-list.selectors';

@Injectable()
export class ShoppingListEffects {
  createShoppingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShoppingListActions.createShoppingList),
      switchMap(() => {
        const userId = this.authService.getAuthenticatedUser()['id'];
        const shoppingList = new ShoppingList(userId);
        return this.http.post<{ name: string }>(
          `${this.environment.apiUrl}/shopping-lists.json`,
          shoppingList
        );
      }),
      map((res) =>
        this.http.get<ShoppingList>(
          `${this.environment.apiUrl}/shopping-lists/${res.name}.json`
        )
      ),
      map((shoppingList) =>
        ShoppingListActions.setShoppingList({ shoppingList })
      )
    )
  );

  fetchShoppingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShoppingListActions.fetchShoppingList),
      switchMap(() => {
        const userId = this.authService.getAuthenticatedUser()['id'];
        const params = new HttpParams().appendAll({
          orderBy: '"userId"',
          equalTo: `"${userId}"`,
        });
        return this.http
          .get<{ [key: string]: ShoppingList }>(
            `${this.environment.apiUrl}/shopping-lists.json`,
            { params }
          )
          .pipe(map((data) => data[Object.keys(data)[0]]));
      }),
      map((shoppingList) => {
        if (shoppingList) {
          return ShoppingListActions.setShoppingList({ shoppingList });
        }
        return ShoppingListActions.createShoppingList();
      })
    )
  );

  storeShoppingList$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ShoppingListActions.storeShoppingList),
        withLatestFrom(this.store.pipe(select(selectShoppingList))),
        switchMap(([_, shoppingList]) => {
          return this.http.put(
            `${this.environment.apiUrl}/shopping-lists.json`,
            shoppingList
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private environment: EnvironmentService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}
}
