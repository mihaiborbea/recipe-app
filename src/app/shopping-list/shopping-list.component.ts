import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import * as ShoppingListActions from './state/shopping-list.actions';
import * as fromApp from '../state/app.store';
import {
  selectEditIndex,
  selectShoppingList,
} from './state/shopping-list.selectors';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  @ViewChild('list') selectionList;
  shoppingList$ = this.store.select(selectShoppingList);
  destroy$ = new Subject<void>();

  constructor(private store: Store<fromApp.AppState>) {}

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
    this.store.dispatch(ShoppingListActions.startEdit({ index }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
