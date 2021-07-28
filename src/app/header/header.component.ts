import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.store';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipesActions from '../recipes/store/recipes.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = false;
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.userSub = this.store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this.isAuthenticated = !!user;
      });
  }

  onSave() {
    this.store.dispatch(RecipesActions.storeRecipes());
  }

  onFetch() {
    this.store.dispatch(RecipesActions.fetchRecipes());
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
