import { Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
  query,
  DocumentReference,
} from '@angular/fire/firestore';

import {
  RecipeIngredients,
  ShoppingList,
  shoppingListConverter,
} from 'client/app/shopping-list/domain/shopping-list.model';
import { Recipe, recipeConverter } from '../domain/recipe.model';

@Injectable()
export class RecipesService {
  constructor(private firestore: Firestore) {}

  private getUserRecipesCollectionPath(userId) {
    return `userData/${userId}/recipes`;
  }

  private getAllRecipesCollectionPath() {
    return `recipes`;
  }

  async getUserRecipes(userId: string): Promise<Recipe[]> {
    const recipesColl = collection(
      this.firestore,
      this.getUserRecipesCollectionPath(userId)
    );
    const q = query(recipesColl).withConverter(recipeConverter);
    const docs = (await getDocs(q)).docs;
    return docs.map((d) => d.data());
  }

  async getAllRecipes(): Promise<Recipe[]> {
    // TODO:
    const recipesColl = collection(
      this.firestore,
      this.getAllRecipesCollectionPath()
    );
    const q = query(recipesColl).withConverter(recipeConverter);
    const docs = (await getDocs(q)).docs;
    return docs.map((d) => d.data());
  }

  async addOrUpdateRecipe(recipe: Partial<Recipe>): Promise<void> {
    let docRef: DocumentReference;
    if (recipe.id) {
      docRef = doc(
        this.firestore,
        this.getUserRecipesCollectionPath(recipe.createdBy),
        recipe.id
      ).withConverter(recipeConverter);
    } else {
      docRef = doc(
        collection(
          this.firestore,
          this.getUserRecipesCollectionPath(recipe.createdBy)
        )
      ).withConverter(recipeConverter);
    }
    await setDoc(docRef, recipe);
  }

  async deleteRecipe(recipe: Recipe): Promise<void> {
    const docRef = doc(
      this.firestore,
      this.getUserRecipesCollectionPath(recipe.createdBy),
      recipe.id
    );
    await deleteDoc(docRef);
  }

  async addRecipeToUserShoppingList(recipe: Recipe, userId) {
    const docRef = collection(
      this.firestore,
      `userData/${userId}/shoppingList`
    ).withConverter(shoppingListConverter);
    let userShoppingList: ShoppingList = new ShoppingList(docRef.id, [
      new RecipeIngredients(recipe.name),
    ]);
    let shoppingRecipeIndex = 0;

    const docs = (await getDocs(docRef)).docs;
    if (docs && docs.length) {
      userShoppingList = docs[0].data();
      shoppingRecipeIndex = userShoppingList.recipes.findIndex(
        (r) => r.recipeName === recipe.name
      );
      if (shoppingRecipeIndex === -1) {
        userShoppingList.recipes.push(new RecipeIngredients(recipe.name));
        shoppingRecipeIndex = userShoppingList.recipes.length - 1;
      }
    }
    userShoppingList.recipes[shoppingRecipeIndex].ingredients.push(
      ...recipe.ingredients
    );
    await setDoc(
      doc(
        this.firestore,
        `userData/${userId}/shoppingList`,
        userShoppingList.id
      ).withConverter(shoppingListConverter),
      userShoppingList
    );
  }
}
