import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppThemes } from './theme.service';

export interface IUserSettings {
  appTheme: AppThemes;
}

@Injectable({
  providedIn: 'root',
})
export class UserSettingsService {
  private _settings: BehaviorSubject<IUserSettings> = new BehaviorSubject({
    appTheme: AppThemes.light,
  });

  constructor() {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      this._settings.next(JSON.parse(savedSettings));
    }
  }

  set all(settings: IUserSettings) {
    localStorage.setItem('userSettings', JSON.stringify(settings));
    this._settings.next(settings);
  }

  set item(settingsItem: Partial<IUserSettings>) {
    const currentSettings = this._settings.getValue();
    localStorage.setItem(
      'userSettings',
      JSON.stringify({ ...currentSettings, ...settingsItem })
    );
    this._settings.next({ ...currentSettings, ...settingsItem });
  }

  get value(): IUserSettings {
    return this._settings.getValue();
  }

  get value$(): Observable<IUserSettings> {
    return this._settings.asObservable();
  }

  getItem(settingsItem: string) {
    return this._settings.getValue()[settingsItem];
  }

  getItem$(settingsItem: string) {
    return this._settings.pipe(map((value) => value[settingsItem]));
  }
}
