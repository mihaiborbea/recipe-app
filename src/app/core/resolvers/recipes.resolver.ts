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

import { Recipe } from '../../recipes/domain/recipe.model';
import * as fromApp from '../../state/app.store';
import * as RecipesActions from '../../recipes/state/recipes.actions';
import { selectRecipes } from 'src/app/recipes/state/recipes.selectors';

@Injectable({ providedIn: 'root' })
export class RecipesResolver implements Resolve<{ recipes: Recipe[] }> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | { recipes: Recipe[] }
    | Observable<{ recipes: Recipe[] }>
    | Promise<{ recipes: Recipe[] }> {
    return this.store.select(selectRecipes).pipe(
      take(1),
      switchMap((recipes) => {
        if (recipes.length === 0) {
          this.store.dispatch(RecipesActions.fetchRecipes());
          return this.actions$.pipe(
            ofType(RecipesActions.SET_RECIPES),
            take(1)
          );
        } else {
          return of({ recipes });
        }
      })
    );
  }
}
