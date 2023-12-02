import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserSettingsService } from './user-settings.service';

export enum AppThemes {
  light = 'light-theme',
  dark = 'dark-theme',
  system = 'system',
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
      } else if (theme === AppThemes.system) {
        this.renderer.addClass(this.document.body, AppThemes.system);
      } else {
        this.renderer.removeClass(this.document.body, AppThemes.dark);
        this.renderer.removeClass(this.document.body, AppThemes.system);
      }
    });
  }

  setTheme(theme: string): void {
    this._currentThemeSub.next(theme as AppThemes);
  }

  get currentTheme$(): Observable<string> {
    return this._currentThemeSub.asObservable();
  }
}
