import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  applyActionCode,
  User,
  verifyPasswordResetCode,
  confirmPasswordReset,
  UserCredential,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  getRedirectResult,
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private providers = {
    microsoft: new OAuthProvider('microsoft.com'),
    facebook: new FacebookAuthProvider(),
    google: new GoogleAuthProvider(),
  };
  constructor(private auth: Auth) {}

  signUp(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  signIn(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  signInWithMicrosoft(): Observable<void> {
    return from(signInWithRedirect(this.auth, this.providers.microsoft));
  }

  signInWithFacebook(): Observable<void> {
    return from(signInWithRedirect(this.auth, this.providers.facebook));
  }

  signInWithGoogle(): Observable<void> {
    return from(signInWithRedirect(this.auth, this.providers.google));
  }

  sendEmailVerification(user: User): Observable<void> {
    return from(sendEmailVerification(user));
  }

  confirmUserEmail(actionCode: string) {
    return from(applyActionCode(this.auth, actionCode));
  }

  sendPasswordResetEmail(email: string): Observable<void> {
    return from(sendPasswordResetEmail(this.auth, email));
  }

  resetPassword(newPassword: string, actionCode: string): Observable<void> {
    const userEmail = verifyPasswordResetCode(this.auth, actionCode);
    if (userEmail) {
      return from(confirmPasswordReset(this.auth, actionCode, newPassword));
    }
  }

  signOut(): Observable<void> {
    return from(this.auth.signOut());
  }

  authenticatedUser(): Observable<User | unknown> {
    return from(
      new Promise((resolve, reject) => {
        this.auth.onAuthStateChanged(
          (user) => {
            resolve(user);
          },
          (_) => {
            reject(null);
          }
        );
      })
    );
  }

  async socialLoginResult(
    providerName: string
  ): Promise<{ userData: UserCredential; token: string }> {
    const userData = await getRedirectResult(this.auth);
    const credential = this.providers[providerName].credentialFromResult(
      this.auth,
      userData
    );
    const token = credential.accessToken;
    return { userData, token };
  }
}
