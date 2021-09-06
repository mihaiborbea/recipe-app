import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { metaReducers } from './state/meta.reducers';
import { CoreEffects } from './state/core.effects';
import { AuthEffects } from '../auth/state/auth.effects';
import { environment } from 'src/environments/environment';
import { appReducer } from './state/app.store';

@NgModule({
  imports: [
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
