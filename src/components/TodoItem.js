import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

const updateStatus = (index, todos) => {
  const todo = todos[index];
  todo.completed = !todo.completed;
  todos.splice(index, 1, todo);
  todo.updateAppState({ todos: [...todos] });
};

const TodoItem = ({ id, title, completed, user, currentIndex, todos }) => (
  <tr>
    <td>
      <input
        id={`todo${id}`}
        type="checkbox"
        defaultChecked={completed}
        onChange={() => updateStatus(currentIndex, todos)}
      />
    </td>

    <td>
      <label htmlFor={`todo${id}`}>
        {title}
      </label>
    </td>

    <td>
      <User {...user} />
    </td>
  </tr>
);

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool,
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
  currentIndex: PropTypes.number.isRequired,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

TodoItem.defaultProps = {
  completed: false,
  user: null,
};

export default TodoItem;
