import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, takeUntil, withLatestFrom } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Recipe } from '../domain/recipe.model';
import * as RecipesActions from '../state/recipes.actions';
import { selectRecipes } from '../state/recipes.selectors';
import { AppState } from 'src/app/core/state/app.store';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: Recipe;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
        map((params) => params['id']),
        withLatestFrom(this.store.select(selectRecipes)),
        map(([id, recipes]) => {
          return recipes.find((recipe) => recipe.id === id);
        })
      )
      .subscribe((recipe) => {
        this.recipe = recipe;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  onAddToShoppingList() {
    this.store.dispatch(
      RecipesActions.addRecipeToShoppingList({
        recipe: this.recipe,
      })
    );
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.store.dispatch(RecipesActions.deleteRecipe({ recipe: this.recipe }));
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
