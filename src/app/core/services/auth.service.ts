import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  authState,
  sendPasswordResetEmail,
} from '@angular/fire/auth';
import { UserCredential } from '@firebase/auth';
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

  sendResetEmail(email: string) {
    return from(sendPasswordResetEmail(this.auth, email));
  }

  signOut(): Observable<void> {
    return from(this.auth.signOut());
  }

  authenticatedUser() {
    return authState(this.auth);
  }
}
