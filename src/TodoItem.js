import React from 'react';
import PropTypes from 'prop-types';
import './Styles/TodoItem.css';

const TodoItem = ({ todoData }) => (
  <div className="todoitem">
    <p className="todoitem_title">
      {todoData.title}
    </p>
    <p className="todoitem_status">
     {!todoData.completed
       ? (<span className="progress">
            IN PROGRESS...
          </span>
       ) : <span className="done">
            DONE!
          </span>}
      )
    </p>
  </div>
);

TodoItem.propTypes = {
  todoData: PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
  }).isRequired,
};

export default TodoItem;
