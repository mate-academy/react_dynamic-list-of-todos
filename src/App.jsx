import React from 'react';
import './styles/general.scss';
import './App.scss';
import Cart from './components/Cart/Cart';
import Products from './components/Products/Products';

const productsFromServer = [
  {
    name: 'Banana', price: '10', id: '1',
  },
  {
    name: 'Apple', price: '8', id: '2',
  },
  {
    name: 'Papaya', price: '10', id: '3',
  },
];

class App extends React.Component {
  state = {
    products: productsFromServer,
    cartItems: [],
    cartVisible: false,
  }

  addToCart = (product) => {
    const { cartItems } = this.state;
    let alreadyInCart = false;

    cartItems.forEach((item) => {
      if (item.id === product.id) {
        // eslint-disable-next-line no-param-reassign
        item.count += 1;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({
        ...product,
        count: 1,
      });
    }

    this.setState({ cartItems });
  }

  clearCart = () => {
    this.setState({
      cartItems: [],
      cartVisible: false,
    });
  }

  getCartVisible = () => {
    const { cartVisible } = this.state;

    this.setState({
      cartVisible: !(cartVisible),
    });
  }

  render() {
    const { products, cartItems } = this.state;

    return (
      <div className="app">
        <h1 className="app__title">Products List</h1>
        <div className="app__content content">
          <Products
            products={products}
            addToCart={this.addToCart}
          />

          <div className="app__cart-block cart-block">
            <button
              type="button"
              onClick={this.getCartVisible}
              className="cart-block__button"
            />

            {(this.state.cartVisible)
              ? (<Cart cartItems={cartItems} clearCart={this.clearCart} />)
              : <></>}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

// class App extends React.Component {
//   state = {
//     // applesList: [],
//     // applesCost: 0,
//     bananasList: [],
//     bananasCost: 0,
//     // papayasList: [],
//     // papayasCost: 0,
//     totalCost: 0,
//   }

//   addToBasket = (product) => {
//     const prodPrice = +product.price.slice(1, 3);

//     if (product.name === 'Banana') {
//       if ((this.state.bananasList.length + 1) % 3 === 0) {
//         this.setState(prevState => ({
//           bananasList: [...prevState.bananasList, 'banana'],
//           bananasCost: prevState.bananasCost + prodPrice / 2,
//           totalCost: prevState.totalCost + prodPrice / 2,
//         }));
//       } else {
//         this.setState(prevState => ({
//           bananasList: [...prevState.bananasList, 'banana'],
//           bananasCost: prevState.bananasCost + prodPrice,
//           totalCost: prevState.totalCost + prodPrice,
//         }));
//       }
//     }
//   }

//   render() {
//     const { basketList, productCost, totalCost } = this.state;

//     return (
//       <div className="app">
//         <h1 className="app__title">
//           List of Products
//         </h1>

//         <ul className="app__products-list products-list">
//           {products.map(product => (
//             <li key={product.id} className="products-list__product product">
//               {`${product.name}(price for 1 kg) : ${product.price}`}
//               <button
//                 className="product__button"
//                 type="button"
//                 onClick={() => {
//                   this.addToBasket(product);
//                 }}
//               >
//                 Add
//               </button>
//             </li>
//           ))}
//         </ul>

//         <ul className="app__basket-list basket-list">
//           <li className="basket-list__item">
//             Bananas:
//             {this.state.bananasCost}
//           </li>
//           <li className="basket-list__item">Apples</li>
//           <li className="basket-list__item">Papayas</li>
//         </ul>
//       </div>
//     );
//   }
// }

// export default App;
