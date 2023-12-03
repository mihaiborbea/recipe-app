import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styles: [
    `
      .mat-mdc-icon-button {
        padding: 0;
      }
    `,
  ],
})
export class RecipesComponent implements OnDestroy {
  hideList = true;
  hideBackBtn = true;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private deviceService: DeviceDetectorService
  ) {
    this.route.firstChild.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        if (params && params.hasOwnProperty('id')) {
          this.hideList = false;
          this.hideBackBtn = false || !this.deviceService.isDesktop();
        }
      });

    this.route.firstChild.url
      .pipe(takeUntil(this.destroy$))
      .subscribe((segments) => {
        if (segments && segments[0] && segments[0].path === 'new') {
          this.hideList = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
    this.hideList = false;
  }
}
