import React from 'react';
import PropTypes from 'prop-types';

import User from './User';

const TodoItem = ({ data }) => (
  <li>
    <User user={data.user} />

    <label htmlFor="case" className="task">
      <input id="case" type="checkbox" defaultChecked={data.completed} />
      <span className="text">{data.title}</span>
      <i className="fas fa-check" />
    </label>
  </li>
);

TodoItem.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
};

export default TodoItem;
