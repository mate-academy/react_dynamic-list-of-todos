import React from 'react';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export const TodoList = ({
  todos,
  onShow,
}: {
  todos: Todo[];
  onShow: (todo: Todo) => void;
}) => (
  <ul>
    {todos.map(todo => (
      <li key={todo.id}>
        <span>{todo.title}</span>
        <button
          onClick={() => {
            onShow(todo);
          }}
        >
          Show
        </button>
      </li>
    ))}
  </ul>
);
