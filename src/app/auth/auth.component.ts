import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { take, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

import { AlertComponent } from '../shared/components/alert/alert.component';
import { PlaceholderDirective } from '../shared/directives/placeholder.directive';
import * as AuthActions from './state/auth.actions';
import { selectAuthError, selectAuthLoading } from './state/auth.selectors';
import { AppState } from '../core/state/app.store';

type AuthPageMode =
  | 'login'
  | 'signup'
  | 'resetPassword'
  | 'accountRecovery'
  | 'verifyEmail';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy, OnInit {
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;
  isLoading$ = this.store.pipe(select(selectAuthLoading));
  authMode: AuthPageMode;
  passwordControl: any;

  private destroy$ = new Subject();

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store
      .pipe(select(selectAuthError), takeUntil(this.destroy$))
      .subscribe((err) => {
        if (err) {
          this.showErrorAlert(err);
        }
      });
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(async (params) => {
        if (params.mode) {
          this.authMode = params.mode;
          if (params.mode === 'verifyEmail') {
            const actionCode = this.route.snapshot.queryParams['oobCode'];
            this.store.dispatch(AuthActions.confirmEmailStart({ actionCode }));
          }
        } else {
          this.authMode = 'login';
        }
        await this.appendPageModeToRoute();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  async onSwitchMode(mode: AuthPageMode): Promise<void> {
    this.authMode = mode;
    await this.appendPageModeToRoute();
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    switch (this.authMode) {
      case 'accountRecovery':
        this.store.dispatch(AuthActions.passwordRecoveryStart({ email }));
        break;
      case 'resetPassword':
        const actionCode = this.route.snapshot.queryParams['oobCode'];
        this.store.dispatch(
          AuthActions.passwordResetStart({ newPassword: password, actionCode })
        );
        break;
      case 'signup':
        this.store.dispatch(AuthActions.signupStart({ email, password }));
        break;
      default:
        this.store.dispatch(AuthActions.loginStart({ email, password }));
    }
    form.reset();
  }

  private async appendPageModeToRoute(): Promise<void> {
    await this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        mode: this.authMode,
      },
      queryParamsHandling: 'merge',
      skipLocationChange: false,
    });
  }

  private showErrorAlert(message: string) {
    const hostViewContainerRef = this.alertHost.viewContainerRef;

    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(AlertComponent);

    componentRef.instance.message = message;

    componentRef.instance.dismiss.pipe(take(1)).subscribe(() => {
      hostViewContainerRef.clear();
      this.store.dispatch(AuthActions.clearError());
    });
  }
}
