import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { takeUntil, withLatestFrom } from 'rxjs/operators';
import { Subject } from 'rxjs';

import * as fromApp from '../../state/app.store';
import * as RecipesActions from '../state/recipes.actions';
import { selectRecipes } from '../state/recipes.selectors';
import { Recipe } from '../domain/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  recipeForm: FormGroup;
  editMode = false;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
        withLatestFrom(this.store.select(selectRecipes))
      )
      .subscribe(([params, recipes]) => {
        this.editMode = params['id'] != null;
        this.recipe = recipes.find((recipe) => recipe.id === params['id']);
        this.initForm();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
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
        this.recipeForm.get('ingredients').value
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
        this.recipeForm.get('ingredients').value
      );
      this.store.dispatch(RecipesActions.createRecipe({ recipe: newRecipe }));
    }
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  onCancel() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      recipeName = this.recipe.name;
      recipeImagePath = this.recipe.imagePath;
      recipeDescription = this.recipe.description;
      if (this.recipe.ingredients) {
        recipeIngredients = new FormArray(
          this.recipe.ingredients.map(
            (i) =>
              new FormGroup({
                name: new FormControl(i.name, Validators.required),
                amount: new FormControl(i.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/),
                ]),
              })
          )
        );
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    });
  }
}
