import { Ingredient } from 'src/app/shared/domain/ingredient.model';

export class ShoppingList {
  constructor(public id: string, public ingredients: Ingredient[] = []) {}
}

export const shoppingListConverter = {
  toFirestore: (shoppingList: ShoppingList) => {
    return {
      ingredients: shoppingList.ingredients.map((i) => ({ ...i })),
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new ShoppingList(
      snapshot.id,
      data.ingredients.map((i) => new Ingredient(i.name, i.amount))
    );
  },
};
