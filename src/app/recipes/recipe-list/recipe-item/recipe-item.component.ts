import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { Recipe } from '../../domain/recipe.model';
import * as RecipesActions from '../../state/recipes.actions';
import { AppState } from 'src/app/core/state/app.store';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styles: [
    `
      .mat-mdc-card-header {
        padding: 0;
      }
    `,
    `
      .mat-mdc-card-content {
        padding: 0;
        display: flex;
      }
    `,
    `
      .mat-mdc-card-content:last-child {
        padding: 0;
      }
    `,
  ],
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;

  constructor(private store: Store<AppState>) {}

  onAddToShoppingList() {
    this.store.dispatch(
      RecipesActions.addRecipeToShoppingList({
        recipe: this.recipe,
      })
    );
  }
}
