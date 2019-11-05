import React from 'react';
import PropTypes from 'prop-types';

function TodoItem({ title, name, todoProcess }) {
  return (
    <tr>
      <td>{title}</td>
      <td>{name}</td>
      <td className={todoProcess ? 'positive' : 'warning'}>
        {todoProcess ? 'Виконано' : 'Забито'}
      </td>
    </tr>
  );
}

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  todoProcess: PropTypes.bool.isRequired,
};

export default TodoItem;
