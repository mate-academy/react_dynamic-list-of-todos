import React, { FC } from 'react';

interface Props {
  userList: User[];
}

export const UserList: FC<Props> = ({ userList }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th>Title</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {
          userList.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.company.name}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};
