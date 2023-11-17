import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../core/guards/auth.guard';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesResolver } from '../core/resolvers/recipes.resolver';
import { RecipesComponent } from './recipes.component';
import { ShoppingListResolver } from '../core/resolvers/shopping-list.resolver';

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    resolve: [ShoppingListResolver],
    children: [
      {
        path: '',
        component: RecipeStartComponent,
        resolve: [RecipesResolver],
      },
      {
        path: 'new',
        component: RecipeEditComponent,
        resolve: [RecipesResolver],
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipesResolver],
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipesResolver],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
