import React from 'react';

function User(props) {
  const { name, email } = props;
  return (
      <td><a href={`mailto:${email}`}>{name}</a></td>
  );
}

export default User;
