import { Selector } from '@ngxs/store';
import { ShoppingCartState } from './shoppingCart.state';
import { ShoppingCartStateModel } from './shoppingCart.model';

export class ShoppingCartStateSelectors {
  @Selector([ShoppingCartState])
  static cartItems(state: ShoppingCartStateModel) {
    return state.cartItems;
  }
}
