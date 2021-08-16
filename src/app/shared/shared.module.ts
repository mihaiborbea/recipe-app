import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
  ],
  imports: [MaterialModule, CommonModule],
  exports: [
    CommonModule,
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    MaterialModule,
    DropdownDirective,
  ],
  entryComponents: [AlertComponent],
})
export class SharedModule {}
