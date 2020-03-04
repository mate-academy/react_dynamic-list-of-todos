import React, { FC } from 'react';

interface Props {
  todo: TodoWithUser;
}

export const Todo: FC<Props> = (props) => {
  const { todo } = props;

  return (
    <tr>
      <td className="cell">{todo.user.name}</td>
      <td className="cell">{todo.title}</td>
      <td className="cell">{`${todo.completed}`}</td>
    </tr>
  );
};
