import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from 'src/app/state/app.store';
import { selectSharedLoading } from 'src/app/shared/state/shared.selector';

@Component({
  selector: 'app-loading',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
})
export class LoadingSpinnerComponent implements AfterViewInit, OnDestroy {
  private loadingSubscription: Subscription;

  constructor(
    private _elmRef: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef,
    private store: Store<AppState>
  ) {}

  ngAfterViewInit(): void {
    this._elmRef.nativeElement.style.display = 'none';
    this.loadingSubscription = this.store
      .select(selectSharedLoading)
      .subscribe((status: boolean) => {
        this._elmRef.nativeElement.style.display = status ? 'block' : 'none';
        this._changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
