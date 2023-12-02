import { ShoppingList } from '../domain/shopping-list.model';

export interface ShoppingListState {
  shoppingList: ShoppingList;
  editRecipeIndex: number;
  editIngredientIndex: number;
}

export const initialState: ShoppingListState = {
  shoppingList: null,
  editRecipeIndex: -1,
  editIngredientIndex: -1,
};
