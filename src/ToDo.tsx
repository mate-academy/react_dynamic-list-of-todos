import React from 'react';

interface Props {
  todo: PreparedTodo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  return (
    <>
      <td className="id">{todo.id}</td>
      <td className="title">{todo.title}</td>
      <td className="user">{todo.users.name}</td>
      <td className={todo.completed
        ? 'ready'
        : 'work'}
      >
        {todo.completed
          ? '  completed'
          : '  in work'}
      </td>
    </>
  );
};
