import React from 'react';

type Props = {
  user: Users;
};

const User: React.FC<Props> = ({ user }) => (
  <td className="users">
    {user.name}
  </td>
);

export default User;
