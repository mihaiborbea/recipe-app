import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  getDocs,
  query,
  where,
  addDoc,
  setDoc,
  doc,
} from '@angular/fire/firestore';

import { ShoppingList } from '../domain/shopping-list.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  constructor(private firestore: Firestore) {}

  async getShoppingList(userId: string): Promise<ShoppingList> {
    const q = query(
      collection(this.firestore, 'shopping-lists'),
      where('userId', '==', userId)
    );
    const docs = (await getDocs(q)).docs;
    if (docs && docs.length) {
      return new ShoppingList(
        docs[0].id,
        docs[0].data()['userId'],
        docs[0].data()['ingredients']
      );
    } else {
      // create a shopping list if the user does not have one
      const docRef = await addDoc(
        collection(this.firestore, 'shopping-lists'),
        {
          userId: userId,
          ingredients: [],
        }
      );
      return new ShoppingList(docRef.id, userId, []);
    }
  }

  async storeUserShoppingList(shoppingList: ShoppingList): Promise<void> {
    await setDoc(doc(this.firestore, 'shopping-lists', shoppingList.id), {
      ingredients: shoppingList.ingredients.map((i) => ({
        name: i.name,
        amount: i.amount,
      })),
      userId: shoppingList.userId,
    });
  }
}
