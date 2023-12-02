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
    const existingIngredientIndex = state.shoppingList.recipes[
      action.rIndex
    ].ingredients.findIndex((i) => i.name === action.ingredient.name);
    if (existingIngredientIndex > 0) {
      const newAmount =
        newState.shoppingList.recipes[action.rIndex].ingredients[
          existingIngredientIndex
        ].amount + action.ingredient.amount;
      newState.shoppingList.recipes[action.rIndex].ingredients[
        existingIngredientIndex
      ].amount = newAmount;
    } else {
      newState.shoppingList.recipes[action.rIndex].ingredients.push(
        action.ingredient
      );
    }
    return newState;
  }),

  on(ShoppingListActions.addIngredients, (state, action) => {
    const newState = { ...state };
    for (let i in action.ingredients) {
      const existingIngredientIndex = state.shoppingList.recipes[
        action.rIndex
      ].ingredients.findIndex((ing) => ing.name === action.ingredients[i].name);
      if (existingIngredientIndex > 0) {
        const newAmount =
          newState.shoppingList.recipes[action.rIndex].ingredients[
            existingIngredientIndex
          ].amount + action.ingredients[i].amount;
        newState.shoppingList.recipes[action.rIndex].ingredients[
          existingIngredientIndex
        ].amount = newAmount;
      } else {
        newState.shoppingList.recipes[action.rIndex].ingredients.push(
          action.ingredients[i]
        );
      }
    }
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
