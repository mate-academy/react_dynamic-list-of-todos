import React from 'react';

interface Props {
  todo: PreparedTodo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  return (
    <div>
      <p>{todo.users.name}</p>
      <p>{todo.title}</p>
      <p>{todo.completed ? 'completed' : 'uncompleted'}</p>
    </div>
  );
};
