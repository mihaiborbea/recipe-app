import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { metaReducers } from './state/meta.reducers';
import { CoreEffects } from './state/core.effects';
import { AuthEffects } from '../auth/state/auth.effects';
import { environment } from 'src/environments/environment';
import { appReducer } from './state/app.store';

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    StoreModule.forRoot(appReducer, {
      metaReducers: metaReducers,
    }),
    EffectsModule.forRoot([CoreEffects, AuthEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }),
  ],
})
export class CoreModule {}
