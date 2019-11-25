
import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

function TodoList(props) {
  return (
    <table align="center">
      <thead>
        <tr>
          <th>title</th>
          <th>completed</th>
          <th>email</th>
        </tr>
      </thead>
      <tbody>
        {
          props.todos.map(item => <TodoItem todo={item} key={item.id} />)
        }
      </tbody>
    </table>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;
