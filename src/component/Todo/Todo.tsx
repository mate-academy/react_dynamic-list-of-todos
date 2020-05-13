import React from 'react';
import { User } from '../User/User';
import { Completed } from '../Completed/Completed';

interface Props {
  todo: TodoType;
}

export function Todo(props: Props) {
  const { todo } = props;

  return (
    <>
      {todo.title}
      <p>
        <Completed isCompleted={todo.completed} />
      </p>
      {todo.user && (
        <User userInfo={todo.user} />
      )}
    </>
  );
}
