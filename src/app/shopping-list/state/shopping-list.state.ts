import { ShoppingList } from '../domain/shopping-list.model';

export interface ShoppingListState {
  shoppingList: ShoppingList;
  editIndex: number;
}

export const initialState: ShoppingListState = {
  shoppingList: null,
  editIndex: -1,
};
