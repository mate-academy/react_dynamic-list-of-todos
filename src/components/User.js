import React from 'react';

function User(props) {
  return (
    <a href={`mailto:${props.user.email}`}>{props.user.name}</a>
  );
};

export default User;
