import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<void>();
  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipe(id: number) {
    return this.recipes.find((r) => r.id === id);
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next();
  }

  updateRecipe(newRecipe: Recipe) {
    const index = this.recipes.findIndex((r) => r.id === newRecipe.id);
    this.recipes[index] = newRecipe;
    this.recipesChanged.next();
  }

  deleteRecipe(recipe: Recipe) {
    const index = this.recipes.findIndex((r) => r.id === recipe.id);
    this.recipes.splice(index, 1);
    this.recipesChanged.next();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
