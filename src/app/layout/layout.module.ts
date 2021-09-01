import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { LoadingBarComponent } from './loading-bar/loading-bar.component';

@NgModule({
  declarations: [HeaderComponent, SidenavListComponent, LoadingBarComponent],
  imports: [SharedModule, RouterModule],
  exports: [HeaderComponent, SidenavListComponent, LoadingBarComponent],
})
export class LayoutModule {}
