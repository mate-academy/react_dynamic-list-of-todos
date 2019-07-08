import React from 'react';
import PropTypes from 'prop-types';

import './Styles/TodoItem.css'

const TodoItem = ({ todoData }) => (
  <table className="todoitem">
    <tbody>
      <tr>
        <td className="todoitem_title">
          {todoData.title}
        </td>
        </tr>
        <tr>
        <td className="todoitem_status">
          {!todoData.completed ?
            <span className="progress">
              IN PROGRESS...
            </span>
          : <span className="done">
              DONE!
            </span>}
        </td>
      </tr>
    </tbody>
  </table>
);

TodoItem.propTypes = {
  todoData: PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
  }).isRequired,
};

export default TodoItem;
