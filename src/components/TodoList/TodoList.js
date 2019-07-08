import React from 'react';
import PropTypes from 'prop-types';

import './TodoList.css';
import TodoItem from './TodoItem/TodoItem';
import TodoHeader from './TodoHeader/TodoHeader';

const TodoList = ({ clearFunction, sortFunction, state }) => (
  <div>
    <div className="buttons-block">
      <button
        type="button"
        className="buttons-block__clear"
        onClick={clearFunction}
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
        {
          state.sortedTodoList.map(todo => <TodoItem todo={todo} />)
        }
      </tbody>
    </table>
  </div>
);

TodoList.propTypes = {
  clearFunction: PropTypes.func.isRequired,
  sortFunction: PropTypes.func.isRequired,
  state: PropTypes.shape({
    sortedTodoList: PropTypes.array.isRequired,
  }).isRequired,
};

export default TodoList;
