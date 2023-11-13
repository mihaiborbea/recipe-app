import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss'],
})
export class ThemeSwitchComponent implements OnInit, OnDestroy {
  currentTheme;

  private sub: Subscription;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.sub = this.themeService.currentTheme$.subscribe((theme) => {
      this.currentTheme = theme;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSelectTheme(value: string) {
    this.themeService.setTheme(value);
  }
}
