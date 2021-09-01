import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidenavListComponent,
    LoadingSpinnerComponent,
  ],
  imports: [SharedModule, RouterModule],
  exports: [HeaderComponent, SidenavListComponent, LoadingSpinnerComponent],
})
export class LayoutModule {}
