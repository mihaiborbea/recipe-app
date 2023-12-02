import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { switchMap, take } from 'rxjs/operators';

import { Recipe } from '../../recipes/domain/recipe.model';
import * as RecipesActions from '../../recipes/state/recipes.actions';
import {
  selectAllRecipes,
  selectUserRecipes,
} from 'client/app/recipes/state/recipes.selectors';
import { AppState } from '../state/app.store';

@Injectable({ providedIn: 'root' })
export class RecipesResolver {
  constructor(private store: Store<AppState>, private actions$: Actions) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | { recipes: Recipe[] }
    | Observable<{ recipes: Recipe[] }>
    | Promise<{ recipes: Recipe[] }> {
    console.log('recipes.resolver: state', state);
    const userOrAllRecipes = state.url.startsWith('/my-recipes')
      ? 'User'
      : 'All';
    console.log('recipes.resolver: userOrAllRecipes', userOrAllRecipes);
    return this.store
      .select(
        userOrAllRecipes === 'User' ? selectUserRecipes : selectAllRecipes
      )
      .pipe(
        take(1),
        switchMap((recipes) => {
          if (recipes.length === 0) {
            this.store.dispatch(
              RecipesActions[`fetch${userOrAllRecipes}Recipes`]()
            );
            return userOrAllRecipes === 'User'
              ? this.actions$.pipe(
                  ofType(RecipesActions.SET_USER_RECIPES),
                  take(1)
                )
              : this.actions$.pipe(
                  ofType(RecipesActions.SET_ALL_RECIPES),
                  take(1)
                );
          } else {
            return of({ recipes });
          }
        })
      );
  }
}
