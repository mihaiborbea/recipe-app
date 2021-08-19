import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppThemes, ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss'],
})
export class ThemeSwitchComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  isDarkTheme;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.sub = this.themeService.currentTheme.subscribe((theme) => {
      this.isDarkTheme = theme === AppThemes.dark ? true : false;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onToggleTheme() {
    this.themeService.toggleTheme();
  }
}
