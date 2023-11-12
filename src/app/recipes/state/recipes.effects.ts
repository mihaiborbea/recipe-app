import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { Recipe } from '../domain/recipe.model';
import * as RecipesActions from './recipes.actions';
import { selectAuthUser } from 'src/app/auth/state/auth.selectors';
import { RecipesService } from '../services/recipes.service';
import { AppState } from 'src/app/core/state/app.store';
import { FileUploadService } from 'src/app/core/services/fileupload.service';
import { FileUpload } from 'src/app/shared/domain/fileupload.model';
@Injectable()
export class RecipesEffects {
  fetchRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        RecipesActions.fetchRecipes,
        RecipesActions.createRecipe,
        RecipesActions.updateRecipe
      ),
      withLatestFrom(this.store.select(selectAuthUser)),
      switchMap(([_, user]) => this.recipesService.getUserRecipes(user.id)),
      map((recipes: Recipe[]) => RecipesActions.setRecipes({ recipes }))
    )
  );

  storeRecipe$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecipesActions.updateRecipe, RecipesActions.createRecipe),
        map(async (action) => {
          const uploadedFileUrl =
            await this.fileUploadService.pushFileToStorage(
              action.recipe.image,
              'recipes'
            );
          const uploadedImage = new FileUpload(
            action.recipe.image.name,
            uploadedFileUrl,
            action.recipe.image.file
          );
          const recipeWithUploadedImage = new Recipe(
            action.recipe.id,
            action.recipe.name,
            action.recipe.description,
            uploadedImage,
            action.recipe.ingredients,
            action.recipe.createdBy
          );
          return this.recipesService.addOrUpdateRecipe(recipeWithUploadedImage);
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
        map((action) => this.recipesService.deleteRecipe(action.recipe))
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
    private recipesService: RecipesService,
    private fileUploadService: FileUploadService
  ) {}
}
