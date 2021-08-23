import { Store } from '@ngrx/store';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { combineLatest, Subject } from 'rxjs';

import { Ingredient } from 'src/app/shared/domain/ingredient.model';
import * as ShoppingListActions from '../state/shopping-list.actions';
import * as fromApp from '../../state/app.store';
import {
  selectEditIndex,
  selectShoppingList,
} from '../state/shopping-list.selectors';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  editMode = false;
  editedItem: Ingredient;

  private destroy$ = new Subject();

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    combineLatest([
      this.store.select(selectEditIndex),
      this.store.select(selectShoppingList),
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([editIndex, shoppingList]) => {
        const index = editIndex;
        if (index > -1) {
          this.editMode = true;
          this.editedItem = shoppingList.ingredients[index];
          this.form.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
          });
        } else {
          this.editMode = false;
        }
      });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(
        ShoppingListActions.updateIngredient({ ingredient: newIngredient })
      );
    } else {
      this.store.dispatch(
        ShoppingListActions.addIngredient({ ingredient: newIngredient })
      );
    }
    this.store.dispatch(ShoppingListActions.storeShoppingList());
    this.editMode = false;
    this.form.resetForm();
  }

  onClear() {
    this.form.resetForm();
    this.editMode = false;
    this.store.dispatch(ShoppingListActions.stopEditIngredient());
  }

  onDelete() {
    this.store.dispatch(ShoppingListActions.deleteIngredient());
    this.store.dispatch(ShoppingListActions.storeShoppingList());
    this.onClear();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.store.dispatch(ShoppingListActions.stopEditIngredient());
  }
}
