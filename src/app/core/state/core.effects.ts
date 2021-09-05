import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import * as RecipesActions from '../../recipes/state/recipes.actions';
import * as ShoppingListActions from '../../shopping-list/state/shopping-list.actions';
import * as AuthActions from '../../auth/state/auth.actions';
import * as CoreActions from './core.actions';

@Injectable()
export class CoreEffects {
  showLoadingBar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        RecipesActions.fetchRecipes,
        ShoppingListActions.fetchShoppingList,
        AuthActions.signupStart,
        AuthActions.loginStart
      ),
      map(() => CoreActions.showLoadingBar())
    )
  );

  hideLoadingBar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        RecipesActions.setRecipes,
        ShoppingListActions.setShoppingList,
        AuthActions.authenticateSuccess,
        AuthActions.authenticateFail
      ),
      map(() => CoreActions.hideLoadingBar())
    )
  );

  constructor(private actions$: Actions) {}
}
