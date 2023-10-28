import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  hideList = false;
  hideBackBtn = true;

  private destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.route.firstChild.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        if (params && params.hasOwnProperty('id')) {
          this.hideList = true;
          this.hideBackBtn = false;
        }
      });

    this.route.firstChild.url
      .pipe(takeUntil(this.destroy$))
      .subscribe((segments) => {
        if (segments && segments[0] && segments[0].path === 'new') {
          this.hideList = true;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
    this.hideList = false;
  }
}
