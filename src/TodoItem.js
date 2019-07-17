import propTypes from 'prop-types';
import React from 'react';

const TodoItem = ({ todoItem }) => (
  <tr key={todoItem.id}>
    <td
      key={`tRow_row-${todoItem.id}--id`}
      className="tableCell"
    >
      {todoItem.id}
    </td>
    <td
      key={`tRow_row-${todoItem.id}--title`}
      className="tableCell"
    >
      {todoItem.title}
    </td>
    <td
      key={`tRow_row-${todoItem.id}--name`}
      className="tableCell"
    >
      {todoItem.user.name}
    </td>
    <td
      key={`tRow_row-${todoItem.id}--completed`}
      className="tableCell"
    >
      <input
        type="checkbox"
        checked={todoItem.completed}
      />
    </td>
  </tr>
);
TodoItem.propTypes = {
  todoItem: propTypes.shape({
    id: propTypes.number,
    completed: propTypes.bool,
    title: propTypes.string,
    user: propTypes.shape({
      id: propTypes.number,
      name: propTypes.string,
    }),
  }).isRequired,
};

export default TodoItem;
