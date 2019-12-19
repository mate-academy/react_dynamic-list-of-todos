import PropTypes from 'prop-types';
import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todoList, handleClick }) => {
  const head = ['id', 'title', 'name', 'email', 'completed'];

  return (
    <table className="table">
      <thead>
        <tr>
          {head.map(headItem => (
            <th
              key={headItem}
              className="table__head-cell"
            >
              <button
                className="button button_head"
                type="button"
                onClick={() => handleClick(headItem)}
              >
                {headItem === 'completed' ? 'status' : headItem}
              </button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {todoList.map(todo => (
          <TodoItem todoItem={todo} key={todo.id} />
        ))}
      </tbody>
    </table>
  );
};

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default TodoList;
