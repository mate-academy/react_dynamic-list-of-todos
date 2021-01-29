import React from 'react';
import { productsType } from '../../types';
import './Product.scss';

const Products = ({ addToCart, products }) => (
  <div>
    <ul className="content__list list">
      {products.map(product => (
        <li key={product.id}>
          <div className="list__product product">
            <p className="product__name name">
              {product.name}
            </p>

            <p className="product__price">
              {`$ ${+product.price}`}
            </p>

            <button
              type="button"
              className="product__button button"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

Products.propTypes = productsType;

export default Products;
