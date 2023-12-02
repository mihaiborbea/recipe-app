import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'client/app/core/state/app.store';
import * as AuthActions from '../../auth/state/auth.actions';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss'],
})
export class SidenavListComponent {
  @Output() sidenavClose = new EventEmitter();

  constructor(private store: Store<AppState>) {}

  onSidenavClose() {
    this.sidenavClose.emit();
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }
}
