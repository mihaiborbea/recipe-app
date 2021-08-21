import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

import { EnvironmentService } from 'src/app/core/services/environment-service.service';
import { ShoppingList } from '../domain/shopping-list.model';
import * as ShoppingListActions from './shopping-list.actions';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable()
export class ShoppingListEffects {
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
          return shoppingList;
        }
        const userId = this.authService.getAuthenticatedUser()['id'];
        return new ShoppingList(userId);
      }),
      map((shoppingList) =>
        ShoppingListActions.setShoppingList({ shoppingList })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private environment: EnvironmentService,
    private authService: AuthService
  ) {}
}
