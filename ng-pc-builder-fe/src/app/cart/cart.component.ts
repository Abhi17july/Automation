import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Part, getCartItems, removeFromCart, selectAllCartItems } from '../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems$: Observable<Part[]>;
  totalPrice$: Observable<number>;

  constructor(private store: Store) {
    this.cartItems$ = this.store.select(selectAllCartItems);
    this.totalPrice$ = this.cartItems$.pipe(
      map(items => items.reduce((total, item) => total + item.price, 0))
    );
  }

  ngOnInit() {
    this.store.dispatch(getCartItems());
  }

  removeFromCart(item: Part) {
    this.store.dispatch(removeFromCart({ partId: item.id }));
  }
}