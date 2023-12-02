import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import {
  selectAuthLoading,
  selectAuthUser,
} from '../../auth/state/auth.selectors';
import { AppState } from '../state/app.store';

@Injectable({ providedIn: 'root' })
export class AuthGuard  {
  constructor(private router: Router, private store: Store<AppState>) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.store.select(selectAuthLoading).pipe(
      filter((isLoading) => !isLoading),
      withLatestFrom(this.store.select(selectAuthUser)),
      map(([_, user]) => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      })
    );
  }
}
