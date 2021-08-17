import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnDestroy {
  hideList = false;
  subs: Subscription[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.subs.push(
      this.route.firstChild.params.subscribe((params) => {
        if (params && params.hasOwnProperty('id')) {
          this.hideList = true;
          console.log('here');
        }
      })
    );
    this.subs.push(
      this.route.firstChild.url.subscribe((segments) => {
        if (segments && segments[0] && segments[0].path === 'new') {
          this.hideList = true;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
    this.hideList = false;
  }
}
