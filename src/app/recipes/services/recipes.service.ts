import { Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
  DocumentReference,
} from '@angular/fire/compat/firestore';

import {
  ShoppingList,
  shoppingListConverter,
} from 'src/app/shopping-list/domain/shopping-list.model';
import { Recipe, recipeConverter } from '../domain/recipe.model';

@Injectable()
export class RecipesService {
  constructor(private firestore: Firestore) {}

  async getUserRecipes(userId: string): Promise<Recipe[]> {
    const docs = (
      await getDocs(
        collection(this.firestore, `userData/${userId}/recipes`).withConverter(
          recipeConverter
        )
      )
    ).docs;
    return docs.map((d) => d.data());
  }

  async addOrUpdateUserRecipe(
    recipe: Partial<Recipe>,
    userId: string
  ): Promise<void> {
    let docRef: DocumentReference;
    if (recipe.id) {
      docRef = doc(
        this.firestore,
        `userData/${userId}/recipes`,
        recipe.id
      ).withConverter(recipeConverter);
    } else {
      docRef = doc(
        collection(this.firestore, `userData/${userId}/recipes`)
      ).withConverter(recipeConverter);
    }
    await setDoc(docRef, recipe);
  }

  async deleteUserRecipe(recipe: Recipe, userId: string): Promise<void> {
    const docRef = doc(this.firestore, `userData/${userId}/recipes`, recipe.id);
    await deleteDoc(docRef);
  }

  async addRecipeToUserShoppingList(recipe: Recipe, userId) {
    let userShoppingList;
    const docs = (
      await getDocs(
        collection(
          this.firestore,
          `userData/${userId}/shoppingList`
        ).withConverter(shoppingListConverter)
      )
    ).docs;
    if (docs && docs.length) {
      userShoppingList = docs[0].data();
    } else {
      const docRef = doc(
        collection(this.firestore, `userData/${userId}/shoppingList`)
      );
      userShoppingList = new ShoppingList(docRef.id);
    }
    userShoppingList.ingredients.push(...recipe.ingredients);
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
