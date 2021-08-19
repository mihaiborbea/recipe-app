import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/domain/ingredient.model';
import * as ShoppingListActions from './state/shopping-list.actions';
import * as fromApp from '../state/app.store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, AfterViewInit {
  @ViewChild('list') selectionList;
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  storeSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
  }

  ngAfterViewInit(): void {
    this.storeSub = this.store.select('shoppingList').subscribe((stateData) => {
      if (stateData.editIndex === -1) {
        this.selectionList.deselectAll();
      }
    });
  }

  onEditItem(index: number) {
    this.store.dispatch(ShoppingListActions.startEdit({ index }));
  }
}
