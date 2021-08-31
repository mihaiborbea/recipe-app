import { Injectable } from '@angular/core';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';

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
}
