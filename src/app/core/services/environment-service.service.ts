import { Injectable } from '@angular/core';

import { IEnvironment } from 'src/environments/ienvironment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService implements IEnvironment {
  constructor() {}

  get production() {
    return environment.production;
  }

  get firebaseAPIKey() {
    return environment.firebaseAPIKey;
  }

  get apiUrl() {
    return environment.apiUrl;
  }
}
