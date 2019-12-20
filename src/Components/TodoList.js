import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ todos }) => {
  const [sortedTodos, setTodos] = useState(todos);

  const sort = (by) => {
    switch (by) {
      case 'user':
        setTodos([...todos]
          .sort((a, b) => a.user.name.localeCompare(b.user.name)));
        break;

      case 'title':
        setTodos([...todos].sort((a, b) => a.title.localeCompare(b.title)));
        break;

      default:
        setTodos([...todos].sort((a, b) => a[by] - b[by]));
    }
  };

  return (
    <table>
      <thead>
        <tr>
          {['id', 'title', 'user', 'completed'].map(column => (
            <th
              key={column}
              onClick={event => sort(event.target.innerText)}
            >
              {column}
            </th>
          ))}
        </tr>
      </thead>
      {sortedTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
        />
      ))}
    </table>
  );
};

TodoList.propTypes = { todos: PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
  completed: PropTypes.bool,
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
})).isRequired };

export default TodoList;
