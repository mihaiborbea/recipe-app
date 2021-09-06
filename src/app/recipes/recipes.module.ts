import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes.component';
import { RecipesService } from './services/recipes.service';
import { RecipesEffects } from './state/recipes.effects';
import { recipesReducer } from './state/recipes.reducer';
import { RECIPES_STATE_NAME } from './state/recipes.selectors';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    StoreModule.forFeature(RECIPES_STATE_NAME, recipesReducer),
    EffectsModule.forFeature([RecipesEffects]),
  ],
  providers: [RecipesService],
})
export class RecipesModule {}
