import React from 'react';
import TodoListItem from './TodoListItem';

type Props = {
  list: FullTaskList;
};

export const TodosList: React.FC<Props> = ({ list }) => {
  return (
    <ul className="list">
      {list.map(item => (
        <TodoListItem
          title={item.title}
          status={item.completed}
          name={item.user.name}
          key={item.title}
        />
      ))}
    </ul>
  );
};
