import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { Recipe } from '../domain/recipe.model';
import * as RecipesActions from './recipes.actions';
import { selectAuthUser } from 'src/app/auth/state/auth.selectors';
import { RecipesService } from '../services/recipes.service';
import { AppState } from 'src/app/core/state/app.store';
@Injectable()
export class RecipesEffects {
  fetchRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.fetchRecipes, RecipesActions.createRecipe),
      withLatestFrom(this.store.select(selectAuthUser)),
      switchMap(([_, user]) => this.recipesService.getUserRecipes(user.id)),
      map((recipes: Recipe[]) => RecipesActions.setRecipes({ recipes }))
    )
  );

  storeRecipe$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecipesActions.updateRecipe, RecipesActions.createRecipe),
        withLatestFrom(this.store.select(selectAuthUser)),
        switchMap(([action, user]) => {
          return this.recipesService.addOrUpdateUserRecipe(
            action.recipe,
            user.id
          );
        })
      ),
    {
      dispatch: false,
    }
  );

  deleteRecipe$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecipesActions.deleteRecipe),
        withLatestFrom(this.store.select(selectAuthUser)),
        switchMap(([action, user]) => {
          return this.recipesService.deleteUserRecipe(action.recipe, user.id);
        })
      ),
    {
      dispatch: false,
    }
  );

  addRecipeToShoppingList$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecipesActions.addRecipeToShoppingList),
        withLatestFrom(this.store.select(selectAuthUser)),
        switchMap(([action, user]) => {
          return this.recipesService.addRecipeToUserShoppingList(
            action.recipe,
            user.id
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private recipesService: RecipesService
  ) {}
}
