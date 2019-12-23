import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './App.css';
// eslint-disable-next-line max-len
const URL = 'https://mate-academy.github.io/react_dynamic-list-of-goods/goods.json';
const getGoodsFromServer = () => {
  return fetch(URL)
    .then(response => response.json());
};
const App = () => {
  const getAllGoods = async() => {
    const goods = await getGoodsFromServer();
    return goods;
  };
  const get5FirstSortedGoods = async() => {
    const goods = await getGoodsFromServer();
    return [...goods]
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, 5);
  };
  const getRedGoods = async() => {
    const goods = await getGoodsFromServer();
    return goods
      .filter(good => good.color === 'red');
  };
  return (
    <div className="App">
      <h1>Goods</h1>
      <div style={{ display: 'flex' }}>
        <GoodsList getGoods={getAllGoods} label="All" />
        <GoodsList getGoods={get5FirstSortedGoods} label="5 first" />
        <GoodsList getGoods={getRedGoods} label="Red" />
      </div>
    </div>
  );
};
const GoodsList = ({ getGoods, label }) => {
  const [isLoaded, setLoaded] = React.useState(false);
  const [visibleGoods, saveGoods] = useState([]);
  const loadGoods = async() => {
    const goods = await getGoods();
    saveGoods(goods);
    setLoaded(true);
  };
  return isLoaded ? (
    <ul>
      {visibleGoods.map(
        ({ id, name, color }) => (
          <li key={id} style={{ color }}>
            {name}
          </li>
        )
      )}
    </ul>
  ) : (
    <button type="button" onClick={loadGoods}>
      {label}
    </button>
  );
};
GoodsList.propTypes = {
  getGoods: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};
export default App;
