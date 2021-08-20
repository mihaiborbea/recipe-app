import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserSettingsService } from './user-settings.service';

export enum AppThemes {
  light = 'light-theme',
  dark = 'dark-theme',
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private _currentThemeSub: BehaviorSubject<AppThemes>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private rendererFactory: RendererFactory2,
    private userSettingsService: UserSettingsService
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this._currentThemeSub = new BehaviorSubject<AppThemes>(
      this.userSettingsService.getItem('appTheme')
    );

    this._currentThemeSub.subscribe((theme) => {
      this.userSettingsService.item = { appTheme: theme as AppThemes };
      if (theme === AppThemes.dark) {
        this.renderer.addClass(this.document.body, AppThemes.dark);
      } else {
        this.renderer.removeClass(this.document.body, AppThemes.dark);
      }
    });
  }

  toggleTheme(): void {
    if (this._currentThemeSub.getValue() === AppThemes.light) {
      this._currentThemeSub.next(AppThemes.dark);
    } else {
      this._currentThemeSub.next(AppThemes.light);
    }
  }

  get currentTheme$(): Observable<string> {
    return this._currentThemeSub.asObservable();
  }
}
