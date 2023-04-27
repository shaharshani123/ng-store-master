import { IProduct } from 'src/app/shared/models';

export class SetCartItem {
  static readonly type = '[Product] Set Cart Item';
  constructor(public payload: IProduct) {}
}

export class DeleteCartItem {
  static readonly type = '[Product] Delete Cart Item';
  constructor(public id: number) {}
}

export class ClearCart {
  static readonly type = '[Product] Clear Cart';
}
