import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  authState,
} from '@angular/fire/auth';
import { doc, Firestore } from '@angular/fire/firestore';
import { UserCredential } from '@firebase/auth';
import { setDoc } from 'firebase/firestore';
import { from, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  signUp(email: string, password: string): Observable<UserCredential> {
    return from(this.createNewUser(email, password));
  }

  signIn(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  signOut(): Observable<void> {
    return from(this.auth.signOut());
  }

  authenticatedUser() {
    return authState(this.auth);
  }

  private async createNewUser(
    email: string,
    password: string
  ): Promise<UserCredential> {
    const authRes = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    await this.createNewUserDocument(authRes);
    return authRes;
  }

  private async createNewUserDocument(userData: UserCredential): Promise<void> {
    const docRef = doc(this.firestore, 'user-data', userData.user.uid);
    const newUserDoc = {
      userId: userData.user.uid,
      recipes: [],
      shoppingList: [],
    };
    await setDoc(docRef, newUserDoc);
  }
}
