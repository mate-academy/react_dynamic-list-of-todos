import React from 'react';
import cn from 'classnames';

type Props = {
  title: string;
  status: boolean;
  name: string;
};

const TodoListItem: React.FC<Props> = ({ title, status, name }) => {
  return (
    <li className={cn('list__item', { completed: status })}>
      <h2>{title}</h2>
      <h3>{name}</h3>
      <p>{status ? 'Completed' : 'Not completed'}</p>
    </li>
  );
};

export default TodoListItem;
