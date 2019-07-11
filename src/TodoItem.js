import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

const TodoItem = ({ data }) => (
  <tr>
    <td>{data.id}</td>
    <td id="mark__data">{data.completed ? '✔' : ''}</td>
    <td id="center__data">{data.title}</td>
    <td>{data.user.name}</td>
  </tr>
);

TodoItem.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
};

export default TodoItem;
