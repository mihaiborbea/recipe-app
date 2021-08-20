import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertComponent } from './components/alert/alert.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './directives/placeholder.directive';
import { MaterialModule } from './material.module';
import { TruncatePipe } from './pipes/truncate.pipe';
import { ThemeSwitchComponent } from './components/theme-switch/theme-switch.component';
import { MustMatchDirective } from './directives/must-match.directive';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
    TruncatePipe,
    ThemeSwitchComponent,
    MustMatchDirective,
  ],
  imports: [MaterialModule, CommonModule, FormsModule],
  exports: [
    CommonModule,
    MaterialModule,
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
    TruncatePipe,
    ThemeSwitchComponent,
    MustMatchDirective,
  ],
  entryComponents: [AlertComponent],
})
export class SharedModule {}
