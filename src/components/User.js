import React from 'react';

export default function User(props) {
  const { name, email } = props;

  return (
    <div className='user'>
      <p className='user-name'>User name: {name}</p>
      <p className='user-email'>User email: {email}</p>
    </div>
  );
}
