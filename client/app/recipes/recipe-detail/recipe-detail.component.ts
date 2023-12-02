import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, takeUntil, withLatestFrom } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Recipe } from '../domain/recipe.model';
import * as RecipesActions from '../state/recipes.actions';
import {
  selectAllRecipes,
  selectUserRecipes,
} from '../state/recipes.selectors';
import { AppState } from 'client/app/core/state/app.store';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
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
    console.log('recipes.resolver: this.router', this.router);
    const userOrAllRecipes = this.router.url.startsWith('/my-recipes')
      ? 'User'
      : 'All';
    console.log('recipes.resolver: userOrAllRecipes', userOrAllRecipes);
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
        map((params) => params['id']),
        withLatestFrom(
          this.store.select(
            userOrAllRecipes === 'User' ? selectUserRecipes : selectAllRecipes
          )
        ),
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
    this.destroy$.unsubscribe();
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
