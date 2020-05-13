import React from 'react';

type Props = {
  user: UserProps;
};

const User: React.FC<Props> = ({ user }) => {
  return (
    <>
      <h3 className="names">
        <p className="article">Name: </p>
        {user.name}
      </h3>
    </>
  );
};

export default User;
