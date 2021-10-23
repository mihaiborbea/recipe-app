import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { take, takeUntil } from 'rxjs/operators';

import { AlertComponent } from '../shared/components/alert/alert.component';
import { PlaceholderDirective } from '../shared/directives/placeholder.directive';
import * as AuthActions from './state/auth.actions';
import { selectAuthError, selectAuthLoading } from './state/auth.selectors';
import { AppState } from '../core/state/app.store';

type AuthMode = 'login' | 'signup' | 'reset' | 'recovery';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy, OnInit {
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;
  isLoading$ = this.store.pipe(select(selectAuthLoading));
  authMode: AuthMode = 'reset';
  passwordControl: any;

  private destroy$ = new Subject();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store
      .pipe(select(selectAuthError), takeUntil(this.destroy$))
      .subscribe((err) => {
        if (err) {
          this.showErrorAlert(err);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  onSwitchMode(mode: AuthMode) {
    this.authMode = mode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    switch (this.authMode) {
      case 'reset':
        this.store.dispatch(AuthActions.resetStart({ email }));
        break;
      case 'signup':
        this.store.dispatch(AuthActions.signupStart({ email, password }));
        break;
      default:
        this.store.dispatch(AuthActions.loginStart({ email, password }));
    }
    form.reset();
  }

  private showErrorAlert(message: string) {
    const alertCmpFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;

    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;

    componentRef.instance.dismiss.pipe(take(1)).subscribe(() => {
      hostViewContainerRef.clear();
      this.store.dispatch(AuthActions.clearError());
    });
  }
}
