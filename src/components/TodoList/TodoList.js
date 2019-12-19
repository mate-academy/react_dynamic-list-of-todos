import PropTypes from 'prop-types';
import React from 'react';
import TodoItem from '../TodoItem';

const TodoList = ({ todoList, onClick }) => {
  const buttons = ['id', 'title', 'name', 'completed'];

  return (
    <table>
      <thead>
        <tr>
          {buttons.map(button => (
            <th key={button}>
              <button
                type="button"
                onClick={() => onClick(button)}
              >
                {button === 'completed' ? 'status' : button}
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
  onClick: PropTypes.func.isRequired,
};

export default TodoList;
