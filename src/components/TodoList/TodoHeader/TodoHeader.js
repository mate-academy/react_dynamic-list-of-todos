import React from 'react';
import './TodoHeader.css';
import PropTypes from 'prop-types';

import Arrow from './Arrow';

const TodoHeader = ({ sortFunction, state }) => (
  <tr className="table__header">
    <th className="w-1"><span>ID</span></th>
    <th>
      <span
        role="button"
        tabIndex={0}
        onKeyUp={() => {}}
        onClick={() => sortFunction('name')}
      >
        User
        <Arrow state={state} sortType="name" />
      </span>
    </th>
    <th className="align-left">
      <span
        role="button"
        tabIndex={0}
        onKeyUp={() => {}}
        onClick={() => sortFunction('title')}
      >
        Task description
        <Arrow state={state} sortType="title" />
      </span>
    </th>
    <th>
      <span
        role="button"
        tabIndex={0}
        onKeyUp={() => {}}
        onClick={() => sortFunction('completed')}
      >
        Status
        <Arrow state={state} sortType="completed" />
      </span>
    </th>
  </tr>
);

TodoHeader.propTypes = {
  sortFunction: PropTypes.func.isRequired,
  state: PropTypes.shape().isRequired,
};

export default TodoHeader;
