import React from 'react';
import PropTypes from 'prop-types';
import Users from './Users';
import Todos from './Todos';

const TodoList = ({ todosItems }) => (
  <ul className="list">
    {todosItems.map(todo => (
      <li key={todo.id} className="todo_list">
        <Users usersItem={todo} />
        <Todos todoItem={todo} />
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todosItems: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object])).isRequired,
};

export default TodoList;
