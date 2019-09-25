import React from 'react';
import { UserProps } from '../PropTypes/PropTypes';
import './User.css';

const User = ({ data }) => (
  <div>
    <p>
      {data.name}
    </p>
    <p>
      {data.email}
    </p>
  </div>
);

User.propTypes = UserProps;

export default User;
