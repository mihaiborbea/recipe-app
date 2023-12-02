import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import * as AuthActions from '../../auth/state/auth.actions';
import { selectAuthUser } from 'client/app/auth/state/auth.selectors';
import { AppState } from 'client/app/core/state/app.store';
import { selectIngredientsCount } from 'client/app/shopping-list/state/shopping-list.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnDestroy {
  @Output() public sidenavToggle = new EventEmitter();
  collapsed = false;
  user$ = this.store.select(selectAuthUser);
  shoppingListCount$ = this.store.select(selectIngredientsCount);
  private destroy$ = new Subject<void>();

  constructor(private store: Store<AppState>) {}

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
