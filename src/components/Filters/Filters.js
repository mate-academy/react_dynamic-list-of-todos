import React from 'react';
import PropTypes from 'prop-types';

import './Filters.css';

const Filter = props => (
  <div className="filter">
    {/* eslint-disable-next-line max-len */}
    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
    <p onClick={() => { props.changeFilterField('user', 'name'); }}>
        User
    </p>
    {/* eslint-disable-next-line max-len */}
    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
    <p onClick={() => { props.changeFilterField('todo', 'title'); }}>
        Title
    </p>
    {/* eslint-disable-next-line max-len */}
    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
    <p onClick={() => { props.changeFilterField('todo', 'completed'); }}>
        Is completed
    </p>
  </div>
);

Filter.propTypes = {
  changeFilterField: PropTypes.func.isRequired,
};

export default Filter;
