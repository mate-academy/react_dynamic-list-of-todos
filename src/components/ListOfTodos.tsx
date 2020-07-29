import React, { FC } from 'react';
import { Todo } from '../types';

type TodosProps = {
  sortedTodos: Todo[];
};

export const ListOfTodos: FC<TodosProps> = (props) => {
  const { sortedTodos } = props;

  return (
    <ol>
      <h2>TODOs:</h2>
      {sortedTodos.map((todo: Todo) => (
        <li
          key={todo.id}
        >
          <input
            type="checkbox"
            defaultChecked={todo.completed}
          />
          {todo.title}
        </li>
      ))}
    </ol>
  );
};
