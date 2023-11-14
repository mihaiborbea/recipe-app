import { Ingredient } from 'src/app/shared/domain/ingredient.model';

export class ShoppingList {
  constructor(public id: string, public recipes: RecipeIngredients[] = []) {}
}

export class RecipeIngredients {
  constructor(
    public recipeName: string,
    public ingredients: Ingredient[] = []
  ) {}
}

export const shoppingListConverter = {
  toFirestore: (shoppingList: ShoppingList) => {
    return {
      recipes: shoppingList.recipes.map((r) => {
        return {
          recipeName: r.recipeName,
          ingredients: r.ingredients.map((i) => ({
            name: i.name,
            amount: i.amount,
          })),
        };
      }),
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    const recipes = data.recipes.map(
      (r) =>
        new RecipeIngredients(
          r.recipeName,
          r.ingredients.map((i) => new Ingredient(i.name, i.amount))
        )
    );
    return new ShoppingList(snapshot.id, recipes);
  },
};
