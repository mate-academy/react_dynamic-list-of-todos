import React from 'react';
import User from './User';

type Props = {
  todo: ApdateTodo;
};

const TodoCard: React.FC<Props> = ({ todo }) => {
  const { title, completed, user } = todo;

  return (
    <>
      <td className="title">{title}</td>
      <td className="status">{(completed) ? 'yes' : 'no'}</td>
      <User user={user} />
    </>
  );
};


export default TodoCard;
