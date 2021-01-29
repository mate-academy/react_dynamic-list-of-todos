import PropTypes from 'prop-types';

const cartItemsType = PropTypes.arrayOf(PropTypes.shape({
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  count: PropTypes.string.isRequired,
}));

const productType = PropTypes.shape({
  price: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
});

export const cartType = PropTypes.shape({
  cartItems: cartItemsType.isRequired,
  clearCart: PropTypes.func.isRequired,
}).isRequired;

export const productsType = PropTypes.shape({
  addToCart: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(productType.isRequired).isRequired,
}).isRequired;
