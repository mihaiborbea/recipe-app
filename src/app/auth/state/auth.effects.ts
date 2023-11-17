import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { firstValueFrom, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { User } from '../domain/user.model';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../core/services/auth.service';
import { AuthErrorCodes, AuthErrorCodesMessages } from '../domain/errorCodes';

@Injectable()
export class AuthEffects {
  loginWithEmail$ = createEffect(() =>
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

  loginWithGoogle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginWithGoogle),
      switchMap(() => {
        return this.authService.signInWithGoogle().pipe(
          switchMap(() => {
            return this.handleSocialAuthentication('google');
          }),
          catchError((errorRes) => {
            return this.handleError(errorRes);
          })
        );
      })
    )
  );

  loginWithFacebook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginWithFacebook),
      switchMap(() => {
        return this.authService.signInWithFacebook().pipe(
          switchMap(() => {
            return this.handleSocialAuthentication('facebook');
          }),
          catchError((errorRes) => {
            return this.handleError(errorRes);
          })
        );
      })
    )
  );

  loginWithMicrosoft$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginWithMicrosoft),
      switchMap(() => {
        return this.authService.signInWithMicrosoft().pipe(
          switchMap(() => {
            return this.handleSocialAuthentication('microsoft');
          }),
          catchError((errorRes) => {
            return this.handleError(errorRes);
          })
        );
      })
    )
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.autoLogin),
      switchMap(() => {
        return this.authService.authenticatedUser().pipe(
          switchMap(async (user) => {
            return this.handleAutomaticAuthentication(user);
          }),
          catchError((errorRes) => {
            return this.handleError(errorRes);
          })
        );
      })
    )
  );

  signup$ = createEffect(() =>
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

  forgotPassword$ = createEffect(() =>
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

  resetPassword$ = createEffect(() =>
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

  logout$ = createEffect(
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
    const user = new User(userData.user.uid, userData.user.email, token, '');
    if (!userData.user.emailVerified) {
      await firstValueFrom(
        this.authService.sendEmailVerification(userData.user)
      );
    }
    return AuthActions.authenticateSuccess({ user, redirect: true });
  }

  private async handleSocialAuthentication(providerName) {
    const socialLoginRes = await this.authService.socialLoginResult(
      providerName
    );
    const user = new User(
      socialLoginRes.userData.user.uid,
      socialLoginRes.userData.user.email,
      socialLoginRes.token,
      socialLoginRes.userData.user.providerData[0].photoURL
    );
    return AuthActions.authenticateSuccess({ user, redirect: true });
  }

  private async handleAutomaticAuthentication(authData) {
    const token = await authData.getIdToken();
    const user = new User(
      authData.uid,
      authData.email,
      token,
      authData.photoURL
    );
    return AuthActions.authenticateSuccess({ user, redirect: false });
  }

  private handleError(errorRes: any) {
    let errorMsg = 'An unknown error occurred!';
    if (!errorRes.code) {
      return of(AuthActions.authenticateFail({ errorMessage: errorMsg }));
    }
    switch (errorRes.code) {
      case AuthErrorCodes.EmailAlreadyUsed:
        errorMsg = AuthErrorCodesMessages.EmailAlreadyUsed;
        break;
      case AuthErrorCodes.UserNotFound:
        errorMsg = AuthErrorCodesMessages.UserNotFound;
        break;
      case AuthErrorCodes.WrongPassword:
        errorMsg = AuthErrorCodesMessages.WrongPassword;
        break;
      case AuthErrorCodes.NotLoggedIn:
        errorMsg = AuthErrorCodesMessages.NotLoggedIn;
        break;
    }
    return of(AuthActions.authenticateFail({ errorMessage: errorMsg }));
  }
}
