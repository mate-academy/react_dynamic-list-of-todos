import React from 'react';
import PropTypes from 'prop-types';

import './TodoList.css';
import TodoItem from './TodoItem/TodoItem';
import TodoHeader from './TodoHeader/TodoHeader';

const TodoList = ({ clearSort, sortFunction, state }) => (
  <div>
    <div className="buttons-block">
      <button
        type="button"
        className="buttons-block__clear"
        onClick={clearSort}
      >
        Clear sorting filters
      </button>
    </div>
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
  </div>
);

TodoList.propTypes = {
  clearSort: PropTypes.func.isRequired,
  sortFunction: PropTypes.func.isRequired,
  state: PropTypes.shape({
    sorted: PropTypes.array.isRequired,
  }).isRequired,
};

export default TodoList;
