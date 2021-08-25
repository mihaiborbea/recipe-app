import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { Recipe } from '../domain/recipe.model';
import * as RecipesActions from './recipes.actions';
import * as fromApp from '../../state/app.store';

// TODO: fix set recipes right after fetch recipes
@Injectable()
export class RecipesEffects {
  fetchRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.fetchRecipes),
      switchMap(() => {
        return this.http.get<Recipe[]>(
          'https://recipe-app-8ac24-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
        );
      }),
      map((recipes) => {
        if (recipes && recipes.length) {
          return recipes.map((recipe) => {
            return {
              ingredients: [], // to ensure 'ingredients' prop on recipes without one
              ...recipe,
            };
          });
        } else {
          return [];
        }
      }),
      map((recipes) => RecipesActions.setRecipes({ recipes }))
    )
  );

  storeRecipes$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecipesActions.storeRecipes),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([_, recipesState]) => {
          return this.http.put(
            'https://recipe-app-8ac24-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
            recipesState.recipes
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
