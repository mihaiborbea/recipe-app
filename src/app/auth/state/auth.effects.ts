import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { firstValueFrom, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { User } from '../domain/user.model';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../core/services/auth.service';

@Injectable()
export class AuthEffects {
  authLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginWithEmail),
      switchMap((action) => {
        return this.authService.signIn(action.email, action.password).pipe(
          switchMap((resData) => {
            return this.handleEmailAuthentication(resData);
          }),
          catchError((errorRes) => {
            return this.handleError(errorRes);
          })
        );
      })
    )
  );

  authLoginWithGoogle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginWithGoogle),
      switchMap(() => {
        return this.authService.signInWithGoogle().pipe(
          switchMap((resData) => {
            return this.handleSocialAuthentication('google');
          }),
          catchError((errorRes) => {
            return this.handleError(errorRes);
          })
        );
      })
    )
  );

  authLoginWithFacebook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginWithFacebook),
      switchMap(() => {
        return this.authService.signInWithFacebook().pipe(
          switchMap((resData) => {
            return this.handleSocialAuthentication('facebook');
          }),
          catchError((errorRes) => {
            return this.handleError(errorRes);
          })
        );
      })
    )
  );

  authLoginWithMicrosoft$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginWithMicrosoft),
      switchMap(() => {
        return this.authService.signInWithMicrosoft().pipe(
          switchMap((resData) => {
            return this.handleSocialAuthentication('microsoft');
          }),
          catchError((errorRes) => {
            return this.handleError(errorRes);
          })
        );
      })
    )
  );

  authSignup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signupStart),
      switchMap((action) => {
        return this.authService.signUp(action.email, action.password).pipe(
          switchMap((resData) => {
            return this.handleEmailAuthentication(resData);
          }),
          catchError((errorRes) => {
            return this.handleError(errorRes);
          })
        );
      })
    )
  );

  authForget$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.passwordRecoveryStart),
      switchMap((action) => {
        return this.authService.sendPasswordResetEmail(action.email).pipe(
          switchMap(async () => AuthActions.passwordRecoveryEnd()),
          catchError((errorRes) => {
            return this.handleError(errorRes);
          })
        );
      })
    )
  );

  passwordReset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.passwordResetStart),
      switchMap((action) => {
        return this.authService
          .resetPassword(action.newPassword, action.actionCode)
          .pipe(
            switchMap(async () => AuthActions.passwordResetEnd()),
            catchError((errorRes) => {
              return this.handleError(errorRes);
            })
          );
      })
    )
  );

  authRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.authenticateSuccess),
        tap((action) => action.redirect && this.router.navigate(['/']))
      ),
    { dispatch: false }
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.autoLogin),
      switchMap(() => {
        return this.authService.authenticatedUser();
      }),
      switchMap(async (authData) => {
        if (!authData) {
          return AuthActions.authenticateFail({ errorMessage: null });
        }
        const token = await authData.getIdToken();
        const user = new User(authData.email, authData.uid, token);

        return AuthActions.authenticateSuccess({
          user,
          redirect: false,
        });
      })
    )
  );

  authLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.authService.signOut();
          this.router.navigate(['/auth']);
        })
      ),
    { dispatch: false }
  );

  startConfirmEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.confirmEmailStart),
      switchMap((action) => {
        return this.authService.confirmUserEmail(action.actionCode).pipe(
          switchMap(async () => AuthActions.confirmEmailEnd()),
          catchError((errorRes) => {
            return this.handleError(errorRes);
          })
        );
      })
    )
  );

  finishConfirmEmail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.confirmEmailEnd),
        tap(() => {
          this.router.navigate(['/recipes']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService
  ) {}

  private async handleEmailAuthentication(userData) {
    const token = await userData.user.getIdToken();
    const user = new User(userData.user.email, userData.user.uid, token);
    if (!userData.user.emailVerified) {
      await firstValueFrom(
        this.authService.sendEmailVerification(userData.user)
      );
    }
    return AuthActions.authenticateSuccess({ user, redirect: true });
  }

  public async handleSocialAuthentication(providerName) {
    const socialLoginRes = await this.authService.socialLoginResult(
      providerName
    );
    const user = new User(
      socialLoginRes.userData.user.email,
      socialLoginRes.userData.user.uid,
      socialLoginRes.token
    );
    return AuthActions.authenticateSuccess({ user, redirect: true });
  }

  private handleError(errorRes: any) {
    let errorMsg = 'An unknown error occurred!';
    if (!errorRes.code) {
      return of(AuthActions.authenticateFail({ errorMessage: errorMsg }));
    }

    switch (errorRes.code) {
      case 'auth/email-already-in-use':
        errorMsg = 'This email already exists!';
        break;
      case 'auth/user-not-found':
        errorMsg = 'User not found!';
        break;
      case 'auth/wrong-password':
        errorMsg = 'Password invalid!';
        break;
    }
    return of(AuthActions.authenticateFail({ errorMessage: errorMsg }));
  }
}
