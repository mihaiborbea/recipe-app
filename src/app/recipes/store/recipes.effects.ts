import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { Recipe } from '../recipe.model';
import * as RecipesActions from './recipes.actions';
import * as fromApp from '../../store/app.store';

@Injectable()
export class RecipesEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(
        'https://recipe-app-8ac24-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      );
    }),
    map((recipes) => {
      return recipes.map((recipe) => {
        return {
          ingredients: [], // to ensure 'ingredients' prop on recipes without one
          ...recipe,
        };
      });
    }),
    map((recipes) => new RecipesActions.SetRecipes(recipes))
  );

  @Effect({ dispatch: false })
  storeRecipes = this.actions$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipesState]) => {
      return this.http.put(
        'https://recipe-app-8ac24-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        recipesState.recipes
      );
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
