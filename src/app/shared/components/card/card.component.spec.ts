// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { CardComponent } from './card.component';

// describe('CardComponent', () => {
//   let component: CardComponent;
//   let fixture: ComponentFixture<CardComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ CardComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(CardComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IProduct } from '../../models';
import { ShoppingCartService } from 'src/app/home/services/shopping-cart.service';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let shoppingCartServiceSpy: jasmine.SpyObj<ShoppingCartService>;

  beforeEach(() => {
    shoppingCartServiceSpy = jasmine.createSpyObj('ShoppingCartService', [
      'addToShoppingCart',
      'addToWishList',
    ]);

    TestBed.configureTestingModule({
      declarations: [CardComponent],
      providers: [
        { provide: ShoppingCartService, useValue: shoppingCartServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onAddToCart', () => {
    it('should emit the product when called', () => {
      const product: IProduct = { id: 1,title:"onAddToCartTest", description: 'Test Product', price: 9.99,
      discountPercentage:1,
      rating:1,
      stock:1,
      brand:"brandTest",
      category: "categoryTest",
      thumbnail:"",
      images:["",""]  };
      spyOn(component.addToCart, 'emit');

      component.onAddToCart(product);

      expect(component.addToCart.emit).toHaveBeenCalledWith(product);
    });
  });

  describe('removeFromCart', () => {
    it('should emit the product ID when called', () => {
      const productId = 1;
      spyOn(component.onRemoveFromCart, 'emit');

      component.removeFromCart(productId);

      expect(component.onRemoveFromCart.emit).toHaveBeenCalledWith(productId);
    });
  });

  describe('addToCartnew', () => {
    it('should add the product to the shopping cart', () => {
      const product: IProduct = { id: 1,title:'TestTitle' ,description: 'Test Product', price: 9.99,
      discountPercentage:1,
      rating:1,
      stock:1,
      brand:"brandTest",
      category: "categoryTest",
      thumbnail:"",
      images:["",""]
    };
      component.product = product;

      component.addToCartnew(product);

      expect(shoppingCartServiceSpy.addToShoppingCart).toHaveBeenCalledWith(product);
    });

    it('should merge the existing product with the new product', () => {
      const existingProduct: IProduct = { id: 1,title:'TestTitleExist', description: 'Test Product', price: 9.99,
      discountPercentage:1,
      rating:1,
      stock:1,
      brand:"brandTest",
      category: "categoryTest",
      thumbnail:"",
      images:["",""] };
      const newProduct: IProduct = { id: 1,title:'TestTitleNew',  description: 'Updated Product', price: 14.99,
      discountPercentage:1,
      rating:1,
      stock:1,
      brand:"brandTest",
      category: "categoryTest",
      thumbnail:"",
      images:["",""]  };
      component.product = existingProduct;

      component.addToCartnew(newProduct);

      expect(shoppingCartServiceSpy.addToShoppingCart).toHaveBeenCalledWith({
        ...existingProduct,
        ...newProduct,
      });
    });
  });

  describe('addToWishList', () => {
    it('should add the product to the wishlist', () => {
      const product: IProduct = { id: 1, title:'TestTitle', description: 'Test Product', price: 9.99,
      discountPercentage:1,
      rating:1,
      stock:1,
      brand:"brandTest",
      category: "categoryTest",
      thumbnail:"",
      images:["",""]  };

      component.addToWishList(product);

      expect(shoppingCartServiceSpy.addToWishList).toHaveBeenCalledWith(product);
    });
  });
});

