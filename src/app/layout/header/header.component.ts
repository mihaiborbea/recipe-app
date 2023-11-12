import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as AuthActions from '../../auth/state/auth.actions';
import { selectAuthUser } from 'src/app/auth/state/auth.selectors';
import { AppState } from 'src/app/core/state/app.store';
import { User } from 'src/app/auth/domain/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() public sidenavToggle = new EventEmitter();
  collapsed = false;
  user: User = null;
  private userSub: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.userSub = this.store.select(selectAuthUser).subscribe((user) => {
      this.user = user;
      console.log('USER', this.user);
    });
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
