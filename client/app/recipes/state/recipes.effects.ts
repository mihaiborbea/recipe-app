import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { Recipe } from '../domain/recipe.model';
import * as RecipesActions from './recipes.actions';
import { selectAuthUser } from 'client/app/auth/state/auth.selectors';
import { RecipesService } from '../services/recipes.service';
import { AppState } from 'client/app/core/state/app.store';
import { FileUploadService } from 'client/app/core/services/fileupload.service';
import { ShoppingListService } from 'client/app/shopping-list/services/shopping-list.service';
import { FileUpload } from 'client/app/shared/domain/fileupload.model';
import * as ShoppingListActions from 'client/app/shopping-list/state/shopping-list.actions';

@Injectable()
export class RecipesEffects {
  fetchUserRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.fetchUserRecipes),
      withLatestFrom(this.store.select(selectAuthUser)),
      switchMap(([_, user]) => this.recipesService.getUserRecipes(user.id)),
      map((recipes: Recipe[]) => RecipesActions.setUserRecipes({ recipes }))
    )
  );

  fetchAllRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.fetchAllRecipes),
      switchMap((_) => this.recipesService.getAllRecipes()),
      map((recipes: Recipe[]) => RecipesActions.setAllRecipes({ recipes }))
    )
  );

  storeRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.updateRecipe, RecipesActions.createRecipe),
      map(async (action) => {
        const uploadedFileUrl = await this.fileUploadService.pushFileToStorage(
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
        console.log('recipe stored.');
        return this.recipesService.addOrUpdateRecipe(recipeWithUploadedImage);
      }),
      map((_) => RecipesActions.fetchUserRecipes())
    )
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

  addRecipeToShoppingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.addRecipeToShoppingList),
      withLatestFrom(this.store.select(selectAuthUser)),
      switchMap(([action, user]) =>
        this.recipesService.addRecipeToUserShoppingList(action.recipe, user.id)
      ),
      withLatestFrom(this.store.select(selectAuthUser)),
      switchMap(([_, user]) =>
        this.shoppingListService.getShoppingList(user.id)
      ),
      map((shoppingList) =>
        ShoppingListActions.setShoppingList({ shoppingList })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private recipesService: RecipesService,
    private fileUploadService: FileUploadService,
    private shoppingListService: ShoppingListService
  ) {}
}
