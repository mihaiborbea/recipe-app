import { createReducer, on } from '@ngrx/store';

import * as ShoppingListActions from './shopping-list.actions';
import { initialState } from './shopping-list.state';

export const shoppingListReducer = createReducer(
  initialState,

  on(ShoppingListActions.setShoppingList, (state, action) => ({
    ...state,
    shoppingList: action.shoppingList,
  })),

  on(ShoppingListActions.addIngredient, (state, action) => {
    const newState = { ...state };
    newState.shoppingList.recipes[action.rIndex].ingredients.push(
      action.ingredient
    );
    return newState;
  }),

  on(ShoppingListActions.addIngredients, (state, action) => {
    const newState = { ...state };
    const recipeIndex = state.shoppingList.recipes.findIndex(
      (recipe) => recipe.recipeName === action.recipe.name
    );
    newState.shoppingList.recipes[recipeIndex].ingredients.push(
      ...action.ingredients
    );
    return newState;
  }),

  on(ShoppingListActions.updateIngredient, (state, action) => {
    const newState = { ...state };
    newState.editIngredientIndex = -1;
    newState.shoppingList.recipes[action.rIndex].ingredients =
      state.shoppingList.recipes[action.rIndex].ingredients.map(
        (ingredient, index) =>
          index === state.editIngredientIndex
            ? { ...action.ingredient }
            : ingredient
      );
    return newState;
  }),

  on(ShoppingListActions.deleteIngredient, (state, action) => {
    const newState = { ...state };
    newState.editIngredientIndex = -1;
    newState.shoppingList.recipes[state.editRecipeIndex].ingredients =
      state.shoppingList.recipes[action.recipeIndex].ingredients.filter(
        (_, index) => index !== state.editIngredientIndex
      );
    return newState;
  }),

  on(ShoppingListActions.startEditIngredient, (state, action) => ({
    ...state,
    editIndex: action.ingredientIndex,
  })),

  on(ShoppingListActions.stopEditIngredient, (state) => ({
    ...state,
    editIndex: -1,
  }))
);
