import { Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
  DocumentReference,
} from '@angular/fire/firestore';

import { Recipe, recipeConverter } from '../domain/recipe.model';

@Injectable({
  providedIn: 'root',
})
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

  async addOrUpdateUserRecipe(recipe: Partial<Recipe>, userId: string) {
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
}
