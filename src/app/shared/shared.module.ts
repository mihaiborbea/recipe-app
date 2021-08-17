import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { MaterialModule } from './material.module';
import { TruncatePipe } from './truncate.pipe';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
    TruncatePipe,
  ],
  imports: [MaterialModule, CommonModule],
  exports: [
    CommonModule,
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    MaterialModule,
    DropdownDirective,
    TruncatePipe,
  ],
  entryComponents: [AlertComponent],
})
export class SharedModule {}
