import React from 'react';
import PropTypes from 'prop-types';

import './TodoList.css';
import TodoItem from './TodoItem/TodoItem';
import TodoHeader from './TodoHeader/TodoHeader';

const TodoList = ({ sortFunction, state }) => (
  <table className="table">
    <thead>
      <TodoHeader
        sortFunction={sortFunction}
        state={state}
      />
    </thead>
    <tbody>
      {state.sorted.map(todo => <TodoItem todo={todo} />)}
    </tbody>
  </table>
);

TodoList.propTypes = {
  sortFunction: PropTypes.func.isRequired,
  state: PropTypes.shape({
    sorted: PropTypes.array.isRequired,
  }).isRequired,
};

export default TodoList;
