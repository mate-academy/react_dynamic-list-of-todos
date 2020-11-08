import React from 'react';
import PropTypes from 'prop-types';

import './Filters.css';

const Filter = props => (
  <tr className="filter">
    <th onClick={() => { props.changeFilterField('user', 'name'); }}>
        User
    </th>
    <th onClick={() => { props.changeFilterField('todo', 'title'); }}>
        Title
    </th>
    <th onClick={() => { props.changeFilterField('todo', 'completed'); }}>
        Is completed
    </th>
  </tr>
);

Filter.propTypes = {
  changeFilterField: PropTypes.func.isRequired,
};

export default Filter;
