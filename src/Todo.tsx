import React from 'react';

type TodoProps = {
  todo: GetTodo;
};

export const Todo: React.FC<TodoProps> = ({ todo }) => {
  return (
    <>
      <p>{todo.title}</p>
      <p>{todo.user.name}</p>
      <p>{todo.completed ? 'completed' : 'uncompleted'}</p>
    </>
  );
};
