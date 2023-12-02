import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';

import { Recipe } from '../domain/recipe.model';
import {
  selectAllRecipes,
  selectUserRecipes,
} from '../state/recipes.selectors';
import { AppState } from 'client/app/core/state/app.store';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    console.log('recipes.resolver: this.router', this.router);
    const userOrAllRecipes = this.router.url.startsWith('/my-recipes')
      ? 'User'
      : 'All';
    console.log('recipes.resolver: userOrAllRecipes', userOrAllRecipes);
    this.store
      .select(
        userOrAllRecipes === 'User' ? selectUserRecipes : selectAllRecipes
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
