import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { takeUntil, withLatestFrom } from 'rxjs/operators';
import { Subject } from 'rxjs';

import * as RecipesActions from '../state/recipes.actions';
import { selectRecipes } from '../state/recipes.selectors';
import { Recipe } from '../domain/recipe.model';
import { AppState } from 'src/app/core/state/app.store';
import { User } from 'src/app/auth/domain/user.model';
import { selectAuthUser } from 'src/app/auth/state/auth.selectors';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  recipeForm: UntypedFormGroup;
  currentUser: User;
  editMode = false;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  get controls() {
    return (<UntypedFormArray>this.recipeForm.get('ingredients')).controls;
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
        withLatestFrom(
          this.store.select(selectRecipes),
          this.store.select(selectAuthUser)
        )
      )
      .subscribe(([params, recipes, user]) => {
        this.editMode = params['id'] != null;
        this.recipe = recipes.find((recipe) => recipe.id === params['id']);
        this.currentUser = user;
        this.initForm();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  onAddIngredient() {
    (<UntypedFormArray>this.recipeForm.get('ingredients')).push(
      new UntypedFormGroup({
        name: new UntypedFormControl(null, Validators.required),
        amount: new UntypedFormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onSubmit() {
    if (this.editMode) {
      const editedRecipe = new Recipe(
        this.recipe.id,
        this.recipeForm.get('name').value,
        this.recipeForm.get('description').value,
        this.recipeForm.get('imagePath').value,
        this.recipeForm.get('ingredients').value,
        this.currentUser.id
      );
      this.store.dispatch(
        RecipesActions.updateRecipe({ recipe: editedRecipe })
      );
    } else {
      const newRecipe = new Recipe(
        null,
        this.recipeForm.get('name').value,
        this.recipeForm.get('description').value,
        this.recipeForm.get('imagePath').value,
        this.recipeForm.get('ingredients').value,
        this.currentUser.id
      );
      this.store.dispatch(RecipesActions.createRecipe({ recipe: newRecipe }));
    }
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  onCancel() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number) {
    (<UntypedFormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new UntypedFormArray([]);

    if (this.editMode) {
      recipeName = this.recipe.name;
      recipeImagePath = this.recipe.imagePath;
      recipeDescription = this.recipe.description;
      if (this.recipe.ingredients) {
        recipeIngredients = new UntypedFormArray(
          this.recipe.ingredients.map(
            (i) =>
              new UntypedFormGroup({
                name: new UntypedFormControl(i.name, Validators.required),
                amount: new UntypedFormControl(i.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/),
                ]),
              })
          )
        );
      }
    }

    this.recipeForm = new UntypedFormGroup({
      name: new UntypedFormControl(recipeName, Validators.required),
      imagePath: new UntypedFormControl(recipeImagePath, Validators.required),
      description: new UntypedFormControl(
        recipeDescription,
        Validators.required
      ),
      ingredients: recipeIngredients,
    });
  }
}
