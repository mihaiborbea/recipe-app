import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';

import { AppState } from '../core/state/app.store';
import * as ShoppingListActions from './state/shopping-list.actions';
import {
  selectEditIndex,
  selectShoppingList,
} from './state/shopping-list.selectors';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  @ViewChild('list') selectionList;
  shoppingList$ = this.store.select(selectShoppingList);

  private destroy$ = new Subject<void>();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select(selectEditIndex)
      .pipe(takeUntil(this.destroy$))
      .subscribe((editIndex) => {
        if (editIndex === -1 && this.selectionList) {
          this.selectionList.deselectAll();
        }
      });
  }

  onEditItem(index: number) {
    this.store.dispatch(
      ShoppingListActions.startEditIngredient({ ingredientIndex: index })
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
