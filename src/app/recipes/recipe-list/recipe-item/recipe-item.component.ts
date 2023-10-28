import { Component, Input } from '@angular/core';
import { Recipe } from '../../domain/recipe.model';

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
}
