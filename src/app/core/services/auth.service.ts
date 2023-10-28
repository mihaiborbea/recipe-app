import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'firebase/auth';
import { from, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userData: User;
  constructor(private auth: AngularFireAuth) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  signUp(email: string, password: string): Observable<any> {
    return from(this.auth.createUserWithEmailAndPassword(email, password));
  }

  signIn(email: string, password: string): Observable<any> {
    return from(this.auth.signInWithEmailAndPassword(email, password));
  }

  sendEmailVerification(user: User): Observable<void> {
    return from(this.sendVerificationMail());
  }

  confirmUserEmail(actionCode: string): Observable<any> {
    return from(this.auth.applyActionCode(actionCode));
  }

  sendPasswordResetEmail(email: string): Observable<void> {
    return from(this.auth.sendPasswordResetEmail(email));
  }

  resetPassword(newPassword: string, actionCode: string): Observable<void> {
    const userEmail = this.auth.verifyPasswordResetCode(actionCode);
    if (userEmail) {
      return from(this.auth.confirmPasswordReset(actionCode, newPassword));
    }
  }

  async sendVerificationMail() {
    const user = await this.auth.currentUser;
    return user.sendEmailVerification();
  }

  signOut(): Observable<void> {
    return from(this.auth.signOut());
  }

  authenticatedUser(): Observable<User> {
    return from([this.userData]);
  }
}
