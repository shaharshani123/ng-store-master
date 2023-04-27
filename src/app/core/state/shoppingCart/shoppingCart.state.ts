import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { ShoppingCartStateModel } from './shoppingCart.model';
import { ClearCart, DeleteCartItem, SetCartItem } from './shoppingCart.actions';
import { IProduct } from 'src/app/shared/models';
@Injectable()
@State<ShoppingCartStateModel>({
  name: 'product',
  defaults: {
    cartItems: [],
  },
})
export class ShoppingCartState {
  @Action(ClearCart)
  clearCart(ctx: StateContext<ShoppingCartStateModel>) {
    ctx.patchState({
      cartItems: [],
    });
  }

  @Action(SetCartItem)
  SetCartItem(ctx: StateContext<ShoppingCartStateModel>, action: SetCartItem) {
    const cartItems: Array<IProduct> = ctx.getState().cartItems;

    cartItems.push(action.payload);

    ctx.patchState({
      cartItems: cartItems,
    });

    console.log(ctx.getState());
  }

  @Action(DeleteCartItem)
  deleteCartItem(ctx: StateContext<ShoppingCartStateModel>, action: DeleteCartItem) {
    const cartItems: Array<IProduct> = ctx.getState().cartItems;

    const index = cartItems.findIndex((item) => item.id === action.id);

    cartItems.splice(index, 1);

    ctx.patchState({
      cartItems: cartItems,
    });

    console.log(ctx.getState());
  }
}
