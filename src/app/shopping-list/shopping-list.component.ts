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
  styles: [
    `
      .mat-mdc-selection-list {
        position: relative;
        height: 70%;
        overflow-y: scroll;
        background: linear-gradient(var(--background) 30%, var(--background)),
          linear-gradient(var(--background), var(--background) 70%) 0 100%,
          radial-gradient(
            farthest-side at 1% 0,
            rgba(0, 0, 0, 0.3),
            rgba(0, 0, 0, 0)
          ),
          radial-gradient(
              farthest-side at 1% 100%,
              rgba(0, 0, 0, 0.3),
              rgba(0, 0, 0, 0)
            )
            0 100%;
        background-repeat: no-repeat;
        background-size: 100% 10px, 100% 10px, 200% 5px, 200% 5px;
        background-attachment: local, local, scroll, scroll;
      }
    `,
    `
      .mat-mdc-selection-list:hover {
        overflow-y: hidden;
      }
    `,
    `
      .mat-mdc-selection-list:hover {
        overflow-y: scroll;
      }
    `,
  ],
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
