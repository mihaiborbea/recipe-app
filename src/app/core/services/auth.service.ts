import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  authState,
  sendPasswordResetEmail,
} from '@angular/fire/auth';
import {
  User,
  UserCredential,
  verifyPasswordResetCode,
  confirmPasswordReset,
} from '@firebase/auth';
import { from, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private auth: Auth) {}

  signUp(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  signIn(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  sendPasswordResetEmail(email: string): Observable<void> {
    return from(sendPasswordResetEmail(this.auth, email));
  }

  resetPassword(newPassword: string, actionCode: string): Observable<any> {
    const userEmail = verifyPasswordResetCode(this.auth, actionCode);
    if (userEmail) {
      return from(confirmPasswordReset(this.auth, actionCode, newPassword));
    }
  }

  signOut(): Observable<void> {
    return from(this.auth.signOut());
  }

  authenticatedUser(): Observable<User> {
    return authState(this.auth);
  }
}
