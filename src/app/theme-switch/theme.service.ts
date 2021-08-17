import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export enum AppThemes {
  light = 'light-theme',
  dark = 'dark-theme',
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private _currentTheme: AppThemes = AppThemes.dark;

  private _currentThemeSub = new BehaviorSubject<string>(this._currentTheme);

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.renderer.addClass(this.document.body, this._currentTheme);
  }

  toggleTheme(): void {
    if (this._currentTheme === AppThemes.light) {
      this._currentTheme = AppThemes.dark;
      this._currentThemeSub.next(AppThemes.dark);
      this.renderer.addClass(this.document.body, AppThemes.dark);
    } else {
      this._currentTheme = AppThemes.light;
      this._currentThemeSub.next(AppThemes.light);
      this.renderer.removeClass(this.document.body, AppThemes.dark);
    }
  }

  get currentTheme(): Observable<string> {
    return this._currentThemeSub.asObservable();
  }
}
