import React, { FC } from 'react';

interface Props {
  todo: TodoWithUser;
}

export const UserItem: FC<Props> = ({ todo }) => {
  return (
    <tr key={todo.id}>
      <td style={{ backgroundColor: 'darkorange' }}>{todo.user.name}</td>
      <td style={{ backgroundColor: 'aquamarine' }}>{todo.title}</td>
      <td className={todo.completed ? 'succesLoad' : 'faildLoad'}>{todo.completed.toString()}</td>
    </tr>
  );
}
