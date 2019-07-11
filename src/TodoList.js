import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

import TodoItem from './TodoItem';

const TodoList = ({ items }) => (
  <tbody>
    {items.map(item => (
      <TodoItem data={item} key={item.id} />
    ))}
  </tbody>
);

TodoList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;
