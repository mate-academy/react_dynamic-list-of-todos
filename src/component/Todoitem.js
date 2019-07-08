import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

const TodoItem = props => (
  <section className="Todo">
    <div>
      <input type="checkbox" checked={props.todo.completed} />
      {props.todo.title}
    </div>
    <User user={props.todo.user} />
  </section>
);

TodoItem.propTypes = {
  todo: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      userId: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
    })
  ).isRequired,
};

export default TodoItem;
