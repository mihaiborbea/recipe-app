import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.store';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent {
  @Output() sidenavClose = new EventEmitter();

  constructor(private store: Store<fromApp.AppState>) {}

  onSidenavClose() {
    this.sidenavClose.emit();
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }
}
