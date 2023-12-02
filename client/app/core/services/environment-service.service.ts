import { Injectable } from '@angular/core';

import { IEnvironment } from 'client/environments/ienvironment';
import { environment } from 'client/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService implements IEnvironment {
  constructor() {}

  get production() {
    return environment.production;
  }

  get firebaseConfig() {
    return environment.firebaseConfig;
  }

  get firebaseAPIKey() {
    return environment.firebaseConfig.apiKey;
  }
}
