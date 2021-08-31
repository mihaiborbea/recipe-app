import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { Recipe } from '../domain/recipe.model';
import * as RecipesActions from './recipes.actions';
import * as fromApp from '../../state/app.store';
import { selectAuthUser } from 'src/app/auth/state/auth.selectors';
import { RecipesService } from '../services/recipes.service';

@Injectable()
export class RecipesEffects {
  fetchRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.fetchRecipes),
      withLatestFrom(this.store.select(selectAuthUser)),
      switchMap(([_, user]) => {
        return this.recipesService.getUserRecipes(user.id);
      }),
      map((recipes: Recipe[]) => {
        return RecipesActions.setRecipes({ recipes });
      })
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
    private store: Store<fromApp.AppState>,
    private recipesService: RecipesService
  ) {}
}
