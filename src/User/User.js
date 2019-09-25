import React from 'react';
import PropTypes from 'prop-types';

const User = (props) => {
  const { name } = props;

  return (
    <div>
      {name}
    </div>
  );
};

User.propTypes = {
  name: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

export default User;
