import React, { FC, useState } from 'react';

interface Props {
  userList: TodoWithUser[];
}

export const UserList: FC<Props> = ({ userList }) => {
  const [visibleUserList, setVisibleUserList] = useState([...userList]);

  function sortedBy(param: string) {
    switch (param) {
      case 'name':
        setVisibleUserList(
          [...userList]
            .sort((a, b) => a.user[param].localeCompare(b.user[param])),
        );
        break;
      case 'title':
        setVisibleUserList(
          [...userList]
            .sort((a, b) => a[param].localeCompare(b[param])),
        );
        break;
      case 'completed':
        setVisibleUserList(
          [...userList]
            .sort((a, b) => Number(b.completed) - Number(a.completed)),
        );
        break;
      default:
        break;
    }
  }

  return (
    <table>
      <thead>
        <tr>
          <th>
            <button className="sortedBtn" type="button" onClick={() => sortedBy('name')}>Name</button>
          </th>
          <th>
            <button className="sortedBtn" type="button" onClick={() => sortedBy('title')}>Title</button>
          </th>
          <th>
            <button className="sortedBtn" type="button" onClick={() => sortedBy('completed')}>Completed</button>
          </th>
        </tr>
      </thead>

      <tbody>
        {
          visibleUserList.map(todo => (
            <tr key={todo.id}>
              <td style={{ backgroundColor: 'darkorange' }}>{todo.user.name}</td>
              <td style={{ backgroundColor: 'aquamarine' }}>{todo.title}</td>
              <td className={todo.completed ? 'succesLoad' : 'faildLoad'}>{todo.completed.toString()}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};
