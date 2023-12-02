import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as AuthActions from './auth/state/auth.actions';
import { AppState } from './core/state/app.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.autoLogin());
  }
}
