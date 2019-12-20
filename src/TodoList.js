import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ todos, sortTodos }) => (
  <table>
    <tbody>
      <tr>
        <th>
          <a
            href="#/"
            onClick={() => sortTodos('id')}
          >
ID
          </a>
        </th>
        <th>
          <a
            href="#/"
            onClick={() => sortTodos('title')}
          >
Title
          </a>
        </th>
        <th>
          <a
            href="#/"
            onClick={() => sortTodos('user')}
          >
User
          </a>
        </th>
        <th>
          <a
            href="#/"
            onClick={() => sortTodos('status')}
          >
Status
          </a>
        </th>
      </tr>
      {todos.map(todo => <TodoItem todo={todo} key={todo.id} />)}
    </tbody>
  </table>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortTodos: PropTypes.func.isRequired,
};

export default TodoList;
