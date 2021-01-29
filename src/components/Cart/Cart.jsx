import React from 'react';
import { cartType } from '../../types';
import './Cart.scss';

const Cart = ({ cartItems, clearCart }) => (
  <div className="cart-block__cart cart">
    <div className="cart__header">
      {
        (cartItems.length === 0)
          ? (<div>Cart is empty</div>)
          : (
            <div>{`You have ${cartItems.length} items in the cart`}</div>
          )
      }
    </div>

    <div className="cart__body">
      <ul className="cart__cart-list cart-list">
        {cartItems.map(item => (
          <li className="cart-list__cart-item cart-item" key={item.id}>
            <p className="product__name name">
              {`${item.name}: $ ${+item.price * item.count}`}
            </p>
          </li>
        ))}
      </ul>
    </div>

    <div className="cart__total">
      { ` Total: $
        ${cartItems.reduce((acc, cur) => acc + (cur.price * cur.count), 0)}
      `}
    </div>

    <div className="cart__menu menu">
      {
        (cartItems.length === 0)
          ? (<></>)
          : (
            <button
              type="button"
              onClick={clearCart}
              className="menu__button button"
            >
              Clear Cart
            </button>
          )
      }
    </div>
  </div>
);

Cart.propTypes = cartType;

export default Cart;
