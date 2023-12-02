import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  getDocs,
  doc,
  setDoc,
} from '@angular/fire/firestore';

import {
  ShoppingList,
  shoppingListConverter,
} from '../domain/shopping-list.model';

@Injectable()
export class ShoppingListService {
  constructor(private firestore: Firestore) {}

  private getUserShoppingListCollectionPath(userId) {
    return `userData/${userId}/shoppingList`;
  }

  async getShoppingList(userId: string): Promise<ShoppingList> {
    const docs = (
      await getDocs(
        collection(
          this.firestore,
          this.getUserShoppingListCollectionPath(userId)
        ).withConverter(shoppingListConverter)
      )
    ).docs;
    if (docs && docs.length) {
      return docs[0].data();
    } else {
      const docRef = doc(
        collection(
          this.firestore,
          this.getUserShoppingListCollectionPath(userId)
        ).withConverter(shoppingListConverter)
      );
      return new ShoppingList(docRef.id);
    }
  }

  async storeUserShoppingList(
    shoppingList: ShoppingList,
    userId: string
  ): Promise<void> {
    await setDoc(
      doc(
        this.firestore,
        this.getUserShoppingListCollectionPath(userId),
        shoppingList.id
      ).withConverter(shoppingListConverter),
      shoppingList
    );
    // }
  }
}
