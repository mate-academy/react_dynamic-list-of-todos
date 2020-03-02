import React from 'react';

interface Props {
  todos: CompleteTodo[];
}

export const TodosList = (props: Props): JSX.Element => {
  const { todos } = props;

  return (
    <ul>
      {todos.map((todo: CompleteTodo) => (
        <li key={todo.id}>
          <span>{todo.title}</span>
          <span>{todo.user.name}</span>
        </li>
      ))}
    </ul>
  );
};
