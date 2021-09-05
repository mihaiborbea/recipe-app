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
import { selectCoreLoading } from 'src/app/core/state/core.selector';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss'],
})
export class LoadingBarComponent implements AfterViewInit, OnDestroy {
  private loadingSubscription: Subscription;

  constructor(
    private _elmRef: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef,
    private store: Store<AppState>
  ) {}

  ngAfterViewInit(): void {
    this._elmRef.nativeElement.style.display = 'none';
    this.loadingSubscription = this.store
      .select(selectCoreLoading)
      .subscribe((status: boolean) => {
        this._elmRef.nativeElement.style.display = status ? 'block' : 'none';
        this._changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
