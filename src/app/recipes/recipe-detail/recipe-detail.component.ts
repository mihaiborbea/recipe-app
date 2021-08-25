import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Recipe } from '../domain/recipe.model';
import * as fromApp from '../../state/app.store';
import * as RecipesActions from '../state/recipes.actions';
import * as ShoppingListActions from '../../shopping-list/state/shopping-list.actions';
import { selectRecipes } from '../state/recipes.selectors';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  id: number;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
        map((params) => +params['id']),
        switchMap((id) => {
          this.id = id;
          return this.store.select(selectRecipes);
        }),
        map((recipes) => {
          return recipes.find((_, index) => index === this.id);
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
      ShoppingListActions.addIngredients({
        ingredients: this.recipe.ingredients,
      })
    );
    this.store.dispatch(ShoppingListActions.storeShoppingList());
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.store.dispatch(RecipesActions.deleteRecipe({ index: this.id }));
    this.store.dispatch(RecipesActions.storeRecipes());
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
