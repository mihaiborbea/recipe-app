import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';
import { ShoppingListService } from './services/shopping-list.service';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListEffects } from './state/shopping-list.effects';
import { shoppingListReducer } from './state/shopping-list.reducer';
import { SHOPPING_LIST_STATE_NAME } from './state/shopping-list.selectors';

@NgModule({
  declarations: [ShoppingEditComponent, ShoppingListComponent],
  imports: [
    FormsModule,
    ShoppingListRoutingModule,
    SharedModule,
    StoreModule.forFeature(SHOPPING_LIST_STATE_NAME, shoppingListReducer),
    EffectsModule.forFeature([ShoppingListEffects]),
  ],
  providers: [ShoppingListService],
})
export class ShoppingListModule {}
