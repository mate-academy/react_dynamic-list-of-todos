import React from 'react';
import PropTypes from 'prop-types';
import './User.css';

export const User = (props) => {
  const { name } = props;

  return (
    <div>
      <p>
        {name}
      </p>
    </div>
  );
};

User.propTypes = {
  name: PropTypes.string,
}.isRequaired;
