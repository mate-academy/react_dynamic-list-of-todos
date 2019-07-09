import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

import TodoItem from './TodoItem';

const TodoList = ({ items }) => (
  <table className="table__blur">
    <thead>
      <tr>
        <th>ID <span className="table__arrow">↓↑</span></th>
        <th>Completed <span className="table__arrow">↓↑</span></th>
        <th>Title <span className="table__arrow">↓↑</span></th>
        <th>User <span className="table__arrow">↓↑</span></th>
      </tr>
    </thead>
    <tbody>
      {items.map(item => (
        <TodoItem data={item} key={item.id} />
      ))}
    </tbody>
  </table>
);

TodoList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;
