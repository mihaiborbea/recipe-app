import { Ingredient } from 'src/app/shared/domain/ingredient.model';

export class ShoppingList {
  constructor(
    public id: string,
    public userId: string,
    public ingredients: Ingredient[] = []
  ) {}
}
