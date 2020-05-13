import React from 'react';
import './User.css';

interface Props {
  userInfo: UserType;
}

export function User(props: Props) {
  const { userInfo } = props;

  return (
    <p className="user">
      {userInfo.name}
    </p>
  );
}
