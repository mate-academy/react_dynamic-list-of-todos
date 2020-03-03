import React, { FC } from 'react';

interface Props {
  userList: TodoWithUser[];
}

export const UserList: FC<Props> = ({ userList }) => {
  const visibleUserList = [...userList];

  return (
    <table>
      <thead>
        <tr>
          <th>
            <button type="button">Name</button>
          </th>
          <th>
            <button type="button">Title</button>
          </th>
          <th>
            <button type="button">Completed</button>
          </th>
        </tr>
      </thead>

      <tbody>
        {
          visibleUserList.map(todo => (
            <tr key={todo.id}>
              <td>{todo.user.name}</td>
              <td>{todo.title}</td>
              <td>{todo.completed.toString()}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};
